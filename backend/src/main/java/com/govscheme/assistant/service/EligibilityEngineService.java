package com.govscheme.assistant.service;

import com.govscheme.assistant.dto.CitizenProfileDto;
import com.govscheme.assistant.dto.CriterionCheckDto;
import com.govscheme.assistant.dto.EligibilityResultDto;
import com.govscheme.assistant.dto.SchemeDto;
import com.govscheme.assistant.entity.CitizenProfile;
import com.govscheme.assistant.entity.Scheme;
import com.govscheme.assistant.repository.SchemeRepository;
import org.springframework.stereotype.Service;

import java.text.NumberFormat;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class EligibilityEngineService {

    private final SchemeRepository schemeRepository;
    private final SchemeService schemeService;
    private final CitizenProfileService citizenProfileService;
    private final NumberFormat currencyFormat = NumberFormat.getCurrencyInstance(new Locale("en", "IN"));

    public EligibilityEngineService(SchemeRepository schemeRepository,
                                    SchemeService schemeService,
                                    CitizenProfileService citizenProfileService) {
        this.schemeRepository = schemeRepository;
        this.schemeService = schemeService;
        this.citizenProfileService = citizenProfileService;
    }

    /**
     * Checks eligibility for an authenticated citizen using their profile
     */
    public List<EligibilityResultDto> checkEligibilityForUser(String email) {
        CitizenProfile profile = citizenProfileService.getProfileEntityByEmail(email);
        CitizenProfileDto profileDto = citizenProfileService.toDto(profile);
        return checkEligibilityForProfile(profileDto);
    }

    /**
     * Checks eligibility for a given citizen profile against all active schemes
     */
    public List<EligibilityResultDto> checkEligibilityForProfile(CitizenProfileDto profile) {
        List<Scheme> activeSchemes = schemeRepository.findByActiveTrue();
        List<EligibilityResultDto> results = new ArrayList<>();

        for (Scheme scheme : activeSchemes) {
            EligibilityResultDto result = evaluateSchemeEligibility(scheme, profile);
            results.add(result);
        }

        // Sort by eligibility score descending, then by financial aid descending
        results.sort((a, b) -> {
            if (b.getScore() != a.getScore()) {
                return Integer.compare(b.getScore(), a.getScore());
            }
            Double aidA = a.getScheme().getFinancialAidAmount() != null ? a.getScheme().getFinancialAidAmount() : 0.0;
            Double aidB = b.getScheme().getFinancialAidAmount() != null ? b.getScheme().getFinancialAidAmount() : 0.0;
            return Double.compare(aidB, aidA);
        });

        return results;
    }

    /**
     * Evaluates a single scheme for a citizen profile
     */
    public EligibilityResultDto evaluateSchemeEligibility(Scheme scheme, CitizenProfileDto profile) {
        EligibilityResultDto result = new EligibilityResultDto();
        result.setScheme(schemeService.toDto(scheme));

        List<CriterionCheckDto> checks = new ArrayList<>();
        List<String> whyEligible = new ArrayList<>();
        List<String> whyNotEligible = new ArrayList<>();
        List<String> missingRequirements = new ArrayList<>();

        int totalRules = 0;
        int passedRules = 0;

        // 1. Age Rule
        if (scheme.getMinAge() != null || scheme.getMaxAge() != null) {
            totalRules++;
            int citizenAge = profile.getAge() != null ? profile.getAge() : 0;
            boolean passed;
            String reqText;

            if (scheme.getMinAge() != null && scheme.getMaxAge() != null) {
                reqText = scheme.getMinAge() + " to " + scheme.getMaxAge() + " years";
                passed = citizenAge >= scheme.getMinAge() && citizenAge <= scheme.getMaxAge();
            } else if (scheme.getMinAge() != null) {
                reqText = "Minimum " + scheme.getMinAge() + " years";
                passed = citizenAge >= scheme.getMinAge();
            } else {
                reqText = "Maximum " + scheme.getMaxAge() + " years";
                passed = citizenAge <= scheme.getMaxAge();
            }

            String reason = passed
                    ? "Age " + citizenAge + " falls within required range (" + reqText + ")."
                    : "Age " + citizenAge + " does not meet required criteria (" + reqText + ").";

            checks.add(new CriterionCheckDto("Age Limit", reqText, citizenAge + " years", passed, reason));

            if (passed) {
                passedRules++;
                whyEligible.add("Age criteria satisfied: " + citizenAge + " years (" + reqText + ")");
            } else {
                whyNotEligible.add("Age requirement unmet: Age is " + citizenAge + " years, whereas scheme requires " + reqText);
                missingRequirements.add("Applicant age must be " + reqText);
            }
        }

        // 2. Gender Rule
        if (scheme.getEligibleGenders() != null && !scheme.getEligibleGenders().equalsIgnoreCase("All")
                && !scheme.getEligibleGenders().equalsIgnoreCase("Any")) {
            totalRules++;
            String citizenGender = profile.getGender() != null ? profile.getGender().trim() : "";
            boolean passed = isMatchedInCommaList(scheme.getEligibleGenders(), citizenGender);

            String reason = passed
                    ? "Gender (" + citizenGender + ") matches eligible gender: " + scheme.getEligibleGenders()
                    : "Gender (" + citizenGender + ") is not eligible. Scheme is for: " + scheme.getEligibleGenders();

            checks.add(new CriterionCheckDto("Gender Restriction", scheme.getEligibleGenders(), citizenGender, passed, reason));

            if (passed) {
                passedRules++;
                whyEligible.add("Gender criteria met: " + citizenGender);
            } else {
                whyNotEligible.add("Gender criteria unmet: Scheme is reserved for " + scheme.getEligibleGenders());
                missingRequirements.add("Scheme is exclusively designed for " + scheme.getEligibleGenders() + " citizens");
            }
        }

        // 3. State / Regional Rule
        if (scheme.getApplicableState() != null && !scheme.getApplicableState().equalsIgnoreCase("All India")
                && !scheme.getApplicableState().equalsIgnoreCase("National")) {
            totalRules++;
            String citizenState = profile.getState() != null ? profile.getState().trim() : "";
            boolean passed = citizenState.equalsIgnoreCase(scheme.getApplicableState().trim());

            String reason = passed
                    ? "Resident of applicable state: " + citizenState
                    : "Resident of " + citizenState + ", but scheme is applicable only in " + scheme.getApplicableState();

            checks.add(new CriterionCheckDto("State Domicile", scheme.getApplicableState(), citizenState, passed, reason));

            if (passed) {
                passedRules++;
                whyEligible.add("State domicile matched: Citizen is a resident of " + citizenState);
            } else {
                whyNotEligible.add("State criteria unmet: Scheme requires domicile in " + scheme.getApplicableState());
                missingRequirements.add("Applicant must be a permanent resident of " + scheme.getApplicableState());
            }
        }

        // 4. Annual Income Rule
        if (scheme.getMaxAnnualIncome() != null && scheme.getMaxAnnualIncome() > 0) {
            totalRules++;
            double citizenIncome = profile.getAnnualIncome() != null ? profile.getAnnualIncome() : 0.0;
            boolean passed = citizenIncome <= scheme.getMaxAnnualIncome();
            String reqText = "Max " + formatCurrency(scheme.getMaxAnnualIncome()) + "/year";
            String citizenText = formatCurrency(citizenIncome) + "/year";

            String reason = passed
                    ? "Annual income " + citizenText + " is within upper ceiling of " + reqText
                    : "Annual income " + citizenText + " exceeds scheme ceiling of " + reqText;

            checks.add(new CriterionCheckDto("Income Ceiling", reqText, citizenText, passed, reason));

            if (passed) {
                passedRules++;
                whyEligible.add("Income criteria met: Annual income " + citizenText + " is below maximum cap " + reqText);
            } else {
                whyNotEligible.add("Income ceiling exceeded: Citizen income " + citizenText + " exceeds limit " + reqText);
                missingRequirements.add("Annual family income must not exceed " + reqText);
            }
        }

        // 5. Social Category Rule
        if (scheme.getEligibleCategories() != null && !scheme.getEligibleCategories().equalsIgnoreCase("All")) {
            totalRules++;
            String citizenCat = profile.getCategory() != null ? profile.getCategory().trim() : "";
            boolean passed = isMatchedInCommaList(scheme.getEligibleCategories(), citizenCat);

            String reason = passed
                    ? "Social category (" + citizenCat + ") matches scheme eligibility: " + scheme.getEligibleCategories()
                    : "Social category (" + citizenCat + ") does not meet criteria. Eligible: " + scheme.getEligibleCategories();

            checks.add(new CriterionCheckDto("Social Category", scheme.getEligibleCategories(), citizenCat, passed, reason));

            if (passed) {
                passedRules++;
                whyEligible.add("Social category matched: " + citizenCat);
            } else {
                whyNotEligible.add("Social category criteria unmet: Scheme targets " + scheme.getEligibleCategories());
                missingRequirements.add("Eligible categories are: " + scheme.getEligibleCategories());
            }
        }

        // 6. Occupation Rule
        if (scheme.getEligibleOccupations() != null && !scheme.getEligibleOccupations().equalsIgnoreCase("All")) {
            totalRules++;
            String citizenOcc = profile.getOccupation() != null ? profile.getOccupation().trim() : "";
            boolean passed = isMatchedInCommaList(scheme.getEligibleOccupations(), citizenOcc);

            String reason = passed
                    ? "Occupation (" + citizenOcc + ") is covered under scheme: " + scheme.getEligibleOccupations()
                    : "Occupation (" + citizenOcc + ") not covered. Scheme is for: " + scheme.getEligibleOccupations();

            checks.add(new CriterionCheckDto("Occupation", scheme.getEligibleOccupations(), citizenOcc, passed, reason));

            if (passed) {
                passedRules++;
                whyEligible.add("Occupation criteria met: " + citizenOcc);
            } else {
                whyNotEligible.add("Occupation mismatch: Scheme is targeted for " + scheme.getEligibleOccupations());
                missingRequirements.add("Must belong to occupation group: " + scheme.getEligibleOccupations());
            }
        }

        // 7. Education Rule
        if (scheme.getEligibleEducations() != null && !scheme.getEligibleEducations().equalsIgnoreCase("All")) {
            totalRules++;
            String citizenEdu = profile.getEducation() != null ? profile.getEducation().trim() : "";
            boolean passed = isMatchedInCommaList(scheme.getEligibleEducations(), citizenEdu);

            String reason = passed
                    ? "Education (" + citizenEdu + ") qualifies for this scheme"
                    : "Education qualification (" + citizenEdu + ") does not match required: " + scheme.getEligibleEducations();

            checks.add(new CriterionCheckDto("Education Qualification", scheme.getEligibleEducations(), citizenEdu, passed, reason));

            if (passed) {
                passedRules++;
                whyEligible.add("Education requirement satisfied: " + citizenEdu);
            } else {
                whyNotEligible.add("Education qualification mismatch: Eligible degrees/levels: " + scheme.getEligibleEducations());
                missingRequirements.add("Required qualification: " + scheme.getEligibleEducations());
            }
        }

        // 8. Disability Rule
        if (Boolean.TRUE.equals(scheme.getRequiresDisability())) {
            totalRules++;
            boolean citizenDisability = Boolean.TRUE.equals(profile.getDisability());
            int pct = profile.getDisabilityPercentage() != null ? profile.getDisabilityPercentage() : 0;
            String citizenVal = citizenDisability ? "Yes (" + pct + "%)" : "No";

            String reason = citizenDisability
                    ? "Disability criterion satisfied (" + pct + "% benchmark disability)"
                    : "Scheme requires applicant to be a Person with Benchmark Disability (PwD)";

            checks.add(new CriterionCheckDto("Disability Status (PwD)", "Must have disability (>=40%)", citizenVal, citizenDisability, reason));

            if (citizenDisability) {
                passedRules++;
                whyEligible.add("Beneficiary disability status verified: " + citizenVal);
            } else {
                whyNotEligible.add("Scheme is exclusively for Persons with Disabilities (PwD)");
                missingRequirements.add("Valid UDID or Disability Certificate (>=40% disability)");
            }
        }

        // 9. Minority Rule
        if (Boolean.TRUE.equals(scheme.getRequiresMinority())) {
            totalRules++;
            boolean citizenMinority = Boolean.TRUE.equals(profile.getMinority());
            String citizenVal = citizenMinority ? "Yes (Minority Community)" : "No";

            String reason = citizenMinority
                    ? "Belongs to notified minority group"
                    : "Scheme is reserved for notified minority communities (Muslim, Christian, Sikh, Buddhist, Jain, Parsi)";

            checks.add(new CriterionCheckDto("Minority Status", "Notified Minority Community", citizenVal, citizenMinority, reason));

            if (citizenMinority) {
                passedRules++;
                whyEligible.add("Minority community status verified");
            } else {
                whyNotEligible.add("Scheme is specifically earmarked for notified minority communities");
                missingRequirements.add("Belonging to notified minority community with community declaration");
            }
        }

        // 10. BPL Card Rule
        if (Boolean.TRUE.equals(scheme.getRequiresBpl())) {
            totalRules++;
            boolean citizenBpl = Boolean.TRUE.equals(profile.getBplCardHolder());
            String citizenVal = citizenBpl ? "Yes (BPL/Antyodaya Ration Card)" : "No";

            String reason = citizenBpl
                    ? "Possesses valid BPL Ration Card"
                    : "Scheme requires BPL (Below Poverty Line) or Antyodaya status";

            checks.add(new CriterionCheckDto("BPL Ration Card", "Valid BPL Card Required", citizenVal, citizenBpl, reason));

            if (citizenBpl) {
                passedRules++;
                whyEligible.add("BPL / Economically vulnerable criteria satisfied");
            } else {
                whyNotEligible.add("Scheme requires Below Poverty Line (BPL) or Ration Card holder status");
                missingRequirements.add("Active BPL / Antyodaya Anna Yojana (AAY) Ration Card");
            }
        }

        // 11. Land Ownership Rule
        if (Boolean.TRUE.equals(scheme.getRequiresLand())) {
            totalRules++;
            boolean citizenLand = Boolean.TRUE.equals(profile.getHasLand());
            double land = profile.getLandHoldingHectares() != null ? profile.getLandHoldingHectares() : 0.0;
            String citizenVal = citizenLand ? "Yes (" + land + " Hectares)" : "No cultivable land";

            String reason = citizenLand
                    ? "Owns cultivable land (" + land + " hectares)"
                    : "Scheme requires cultivable agricultural land ownership";

            checks.add(new CriterionCheckDto("Agricultural Land", "Must own cultivable land", citizenVal, citizenLand, reason));

            if (citizenLand) {
                passedRules++;
                whyEligible.add("Agricultural land holding criteria met: " + land + " Hectares");
            } else {
                whyNotEligible.add("Cultivable agricultural land ownership is mandatory for this scheme");
                missingRequirements.add("Land ownership documents (RoR / Patta / Land Records)");
            }
        }

        // 12. Rural / Urban Area Rule
        if (Boolean.TRUE.equals(scheme.getRuralOnly())) {
            totalRules++;
            boolean isRural = "Rural".equalsIgnoreCase(profile.getRuralUrban());
            String reason = isRural
                    ? "Resident of Rural Area"
                    : "Scheme is earmarked exclusively for Rural areas";

            checks.add(new CriterionCheckDto("Area Classification", "Rural Area Only", profile.getRuralUrban(), isRural, reason));

            if (isRural) {
                passedRules++;
                whyEligible.add("Residency in rural jurisdiction verified");
            } else {
                whyNotEligible.add("Scheme is reserved exclusively for rural residents");
                missingRequirements.add("Permanent residence located in a designated rural area");
            }
        } else if (Boolean.TRUE.equals(scheme.getUrbanOnly())) {
            totalRules++;
            boolean isUrban = "Urban".equalsIgnoreCase(profile.getRuralUrban());
            String reason = isUrban
                    ? "Resident of Urban Area"
                    : "Scheme is earmarked exclusively for Urban areas";

            checks.add(new CriterionCheckDto("Area Classification", "Urban Area Only", profile.getRuralUrban(), isUrban, reason));

            if (isUrban) {
                passedRules++;
                whyEligible.add("Residency in urban municipality verified");
            } else {
                whyNotEligible.add("Scheme is reserved exclusively for urban residents");
                missingRequirements.add("Permanent residence in an urban municipal area");
            }
        }

        // If a scheme has no explicit constraints, citizen is 100% eligible
        int score = totalRules == 0 ? 100 : (int) Math.round(((double) passedRules / totalRules) * 100);

        String matchStatus;
        boolean isEligible;
        if (score == 100) {
            matchStatus = "FULLY_ELIGIBLE";
            isEligible = true;
            if (whyEligible.isEmpty()) {
                whyEligible.add("Open to all Indian citizens meeting standard national criteria");
            }
        } else if (score >= 60) {
            matchStatus = "PARTIALLY_ELIGIBLE";
            isEligible = false;
        } else {
            matchStatus = "NOT_ELIGIBLE";
            isEligible = false;
        }

        result.setScore(score);
        result.setMatchStatus(matchStatus);
        result.setEligible(isEligible);
        result.setPassedCriteriaCount(passedRules);
        result.setTotalCriteriaCount(totalRules);
        result.setCriteriaChecks(checks);
        result.setWhyEligibleReasons(whyEligible);
        result.setWhyNotEligibleReasons(whyNotEligible);
        result.setMissingRequirements(missingRequirements);

        // Required Documents Section
        result.setRequiredDocuments(parseTextList(scheme.getRequiredDocuments()));

        // Application Procedure Steps Section
        result.setApplicationSteps(parseTextList(scheme.getApplicationProcedure()));

        return result;
    }

    private boolean isMatchedInCommaList(String allowedValues, String userVal) {
        if (allowedValues == null || allowedValues.trim().isEmpty() || allowedValues.equalsIgnoreCase("All")) {
            return true;
        }
        if (userVal == null || userVal.trim().isEmpty()) {
            return false;
        }
        String[] parts = allowedValues.split("[,;/]");
        for (String p : parts) {
            String trimmed = p.trim();
            if (trimmed.equalsIgnoreCase("All") || trimmed.equalsIgnoreCase(userVal.trim()) || userVal.toLowerCase().contains(trimmed.toLowerCase())) {
                return true;
            }
        }
        return false;
    }

    private List<String> parseTextList(String raw) {
        if (raw == null || raw.trim().isEmpty()) {
            return Collections.emptyList();
        }
        return Arrays.stream(raw.split("[\\r\\n]+|(?<=\\d\\.)|(?<=[;])"))
                .map(String::trim)
                .filter(s -> !s.isEmpty() && !s.matches("^\\d+\\.$"))
                .map(s -> s.replaceFirst("^[-*•\\d.]+\\s*", ""))
                .filter(s -> !s.isEmpty())
                .collect(Collectors.toList());
    }

    private String formatCurrency(Double amount) {
        if (amount == null) return "₹0";
        return currencyFormat.format(amount).replace(".00", "");
    }
}
