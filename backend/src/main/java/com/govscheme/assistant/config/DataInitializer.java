package com.govscheme.assistant.config;

import com.govscheme.assistant.entity.CitizenProfile;
import com.govscheme.assistant.entity.Scheme;
import com.govscheme.assistant.entity.User;
import com.govscheme.assistant.enums.Role;
import com.govscheme.assistant.repository.CitizenProfileRepository;
import com.govscheme.assistant.repository.SchemeRepository;
import com.govscheme.assistant.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final CitizenProfileRepository citizenProfileRepository;
    private final SchemeRepository schemeRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository,
                           CitizenProfileRepository citizenProfileRepository,
                           SchemeRepository schemeRepository,
                           PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.citizenProfileRepository = citizenProfileRepository;
        this.schemeRepository = schemeRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        seedUsers();
        seedSchemes();
    }

    private void seedUsers() {
        if (!userRepository.existsByEmail("admin@gov.in")) {
            User admin = new User();
            admin.setFullName("System Administrator");
            admin.setEmail("admin@gov.in");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setPhoneNumber("+91-9876543210");
            admin.setRole(Role.ROLE_ADMIN);
            admin.setCreatedAt(LocalDateTime.now());
            userRepository.save(admin);
            System.out.println("Default Admin seeded: admin@gov.in / admin123");
        }

        if (!userRepository.existsByEmail("citizen@example.com")) {
            User citizen = new User();
            citizen.setFullName("Ramesh Kumar");
            citizen.setEmail("citizen@example.com");
            citizen.setPassword(passwordEncoder.encode("citizen123"));
            citizen.setPhoneNumber("+91-9812345678");
            citizen.setRole(Role.ROLE_CITIZEN);
            citizen.setCreatedAt(LocalDateTime.now());
            User savedCitizen = userRepository.save(citizen);

            CitizenProfile profile = new CitizenProfile();
            profile.setUser(savedCitizen);
            profile.setAge(28);
            profile.setGender("Male");
            profile.setState("Karnataka");
            profile.setDistrict("Bengaluru Rural");
            profile.setAnnualIncome(180000.0);
            profile.setOccupation("Farmer");
            profile.setCategory("OBC");
            profile.setEducation("10th Pass");
            profile.setMaritalStatus("Married");
            profile.setDisability(false);
            profile.setDisabilityPercentage(0);
            profile.setMinority(false);
            profile.setRuralUrban("Rural");
            profile.setBplCardHolder(true);
            profile.setHasLand(true);
            profile.setLandHoldingHectares(1.5);
            profile.setUpdatedAt(LocalDateTime.now());
            citizenProfileRepository.save(profile);

            System.out.println("Default Citizen seeded: citizen@example.com / citizen123");
        }
    }

    private void seedSchemes() {
        if (schemeRepository.count() > 0) {
            return;
        }

        // Scheme 1: PM-KISAN
        Scheme s1 = new Scheme();
        s1.setName("PM Kisan Samman Nidhi Yojana");
        s1.setCode("PM-KISAN");
        s1.setCategory("Agriculture & Rural");
        s1.setMinistry("Ministry of Agriculture and Farmers Welfare");
        s1.setBriefDescription("Direct financial income support of ₹6,000 per year provided to all landholding farmer families across India, transferred directly into bank accounts in three equal installments.");
        s1.setBenefits("₹6,000 per annum credited directly into Aadhaar-seeded bank accounts in 3 installments of ₹2,000 each (April-July, August-November, December-March).");
        s1.setFinancialAidAmount(6000.0);
        s1.setLevel("Central");
        s1.setApplicableState("All India");
        s1.setMinAge(18);
        s1.setMaxAge(75);
        s1.setEligibleGenders("All");
        s1.setMaxAnnualIncome(1000000.0);
        s1.setEligibleCategories("All");
        s1.setEligibleOccupations("Farmer,Daily Wage / Laborer");
        s1.setEligibleEducations("All");
        s1.setRequiresLand(true);
        s1.setRuralOnly(false);
        s1.setRequiredDocuments("1. Aadhaar Card\n2. Bank Account Passbook (Aadhaar linked)\n3. Land Ownership Records (Patta / Khatauni / RoR)\n4. Mobile number registered with Aadhaar");
        s1.setApplicationProcedure("1. Visit the official PM-KISAN portal (https://pmkisan.gov.in).\n2. Click on 'New Farmer Registration' under Farmers Corner.\n3. Enter your Aadhaar number and select state.\n4. Fill personal, landholding details, and bank account information.\n5. Submit form. The application will be verified by the local Patwari/Nodal officer.");
        s1.setOfficialWebsite("https://pmkisan.gov.in");
        s1.setHelplineNumber("155261 / 011-24300606");
        s1.setTags("farmer, agriculture, kisan, direct benefit transfer, crop, land");
        schemeRepository.save(s1);

        // Scheme 2: Ayushman Bharat - PMJAY
        Scheme s2 = new Scheme();
        s2.setName("Ayushman Bharat - Pradhan Mantri Jan Arogya Yojana (PM-JAY)");
        s2.setCode("PM-JAY");
        s2.setCategory("Healthcare & Wellness");
        s2.setMinistry("Ministry of Health and Family Welfare");
        s2.setBriefDescription("World's largest government-funded health assurance scheme providing health cover of ₹5 Lakh per family per year for secondary and tertiary care hospitalization.");
        s2.setBenefits("Cashless and paperless access to medical services up to ₹5,00,000 per family per year across empaneled public and private hospitals across India.");
        s2.setFinancialAidAmount(500000.0);
        s2.setLevel("Central");
        s2.setApplicableState("All India");
        s2.setMinAge(0);
        s2.setMaxAge(120);
        s2.setEligibleGenders("All");
        s2.setMaxAnnualIncome(250000.0);
        s2.setEligibleCategories("All");
        s2.setEligibleOccupations("All");
        s2.setEligibleEducations("All");
        s2.setRequiresBpl(false);
        s2.setRequiredDocuments("1. Aadhaar Card or Voter ID\n2. Ration Card or Family Document\n3. Proof of Income / BPL status (if applicable)\n4. Active mobile number");
        s2.setApplicationProcedure("1. Visit https://pmjay.gov.in and click 'Am I Eligible'.\n2. Enter mobile number and verify via OTP.\n3. Search family records in Socio-Economic Caste Census database.\n4. Visit nearest Common Service Centre (CSC) or Empaneled Health Care Provider (EHCP).\n5. Complete biometric e-KYC and download Ayushman Golden Card.");
        s2.setOfficialWebsite("https://pmjay.gov.in");
        s2.setHelplineNumber("14555 / 1800-111-565");
        s2.setTags("health, hospital, insurance, medical, treatment, ayushman, cash cover");
        schemeRepository.save(s2);

        // Scheme 3: Pradhan Mantri Awas Yojana - Gramin
        Scheme s3 = new Scheme();
        s3.setName("Pradhan Mantri Awas Yojana - Gramin (PMAY-G)");
        s3.setCode("PMAY-G");
        s3.setCategory("Housing & Shelter");
        s3.setMinistry("Ministry of Rural Development");
        s3.setBriefDescription("Provides direct financial assistance to homeless or families living in kutcha/dilapidated houses in rural areas for constructing a pucca house with basic amenities.");
        s3.setBenefits("Financial grant of ₹1,20,000 in plain areas and ₹1,30,000 in hilly/difficult states, along with 90/95 days of unskilled labor wages under MGNREGA.");
        s3.setFinancialAidAmount(120000.0);
        s3.setLevel("Central");
        s3.setApplicableState("All India");
        s3.setMinAge(18);
        s3.setMaxAge(75);
        s3.setEligibleGenders("All");
        s3.setMaxAnnualIncome(200000.0);
        s3.setEligibleCategories("All");
        s3.setEligibleOccupations("Farmer,Daily Wage / Laborer,Artisan / Weaver,Unemployed");
        s3.setEligibleEducations("All");
        s3.setRuralOnly(true);
        s3.setRequiredDocuments("1. Aadhaar Card\n2. Bank Account Passbook\n3. MGNREGA Job Card Number\n4. Swachh Bharat Mission (SBM) registration number for toilet subsidy\n5. Land / House site ownership document");
        s3.setApplicationProcedure("1. Beneficiary list is prioritized based on SECC 2011 data by Gram Sabha.\n2. Contact your local Gram Panchayat or Block Development Officer (BDO).\n3. Field inspector performs geo-tagging of current house.\n4. Upon sanction, grant is credited in 3 stages corresponding to construction milestones.");
        s3.setOfficialWebsite("https://pmayg.nic.in");
        s3.setHelplineNumber("1800-11-6446");
        s3.setTags("housing, home, rural, pucca house, construction, awas yojana");
        schemeRepository.save(s3);

        // Scheme 4: National Scholarship Scheme for Higher Education
        Scheme s4 = new Scheme();
        s4.setName("Central Sector Scheme of Scholarships for College and University Students");
        s4.setCode("NSP-CSSS");
        s4.setCategory("Education & Skill");
        s4.setMinistry("Ministry of Education");
        s4.setBriefDescription("Financial assistance to meritorious students from low-income families to meet day-to-day expenses while pursuing graduate and post-graduate studies.");
        s4.setBenefits("₹12,000 per annum at graduation level for first 3 years and ₹20,000 per annum at post-graduate level, directly credited to bank account.");
        s4.setFinancialAidAmount(20000.0);
        s4.setLevel("Central");
        s4.setApplicableState("All India");
        s4.setMinAge(17);
        s4.setMaxAge(26);
        s4.setEligibleGenders("All");
        s4.setMaxAnnualIncome(450000.0);
        s4.setEligibleCategories("All");
        s4.setEligibleOccupations("Student");
        s4.setEligibleEducations("12th Pass,Diploma / ITI,Graduate");
        s4.setRequiredDocuments("1. Class 12th Board Marksheet\n2. Aadhaar Card\n3. Income Certificate from Revenue Authority (below ₹4.5 Lakhs)\n4. College Admission Fee Receipt & Bonafide Certificate\n5. Bank Passbook in student's name");
        s4.setApplicationProcedure("1. Register on the National Scholarship Portal (https://scholarships.gov.in).\n2. Fill Application Form with personal, academic, and fee details.\n3. Upload scanned documents.\n4. Institute Nodal Officer (INO) verifies application online.\n5. Scholarship is disbursed via DBT PFMS.");
        s4.setOfficialWebsite("https://scholarships.gov.in");
        s4.setHelplineNumber("0120-6619540");
        s4.setTags("scholarship, student, college, university, education, fees, books");
        schemeRepository.save(s4);

        // Scheme 5: Pradhan Mantri Mudra Yojana (PMMY)
        Scheme s5 = new Scheme();
        s5.setName("Pradhan Mantri Mudra Yojana (PMMY)");
        s5.setCode("PM-MUDRA");
        s5.setCategory("Financial Inclusion & Business");
        s5.setMinistry("Ministry of Finance");
        s5.setBriefDescription("Provides collateral-free loans up to ₹10 Lakhs to micro and small non-farm, non-corporate enterprises across Shishu, Kishor, and Tarun categories.");
        s5.setBenefits("Collateral-free business loans up to ₹50,000 (Shishu), up to ₹5 Lakhs (Kishor), and up to ₹10 Lakhs (Tarun) with low interest rates and repayment flexibility.");
        s5.setFinancialAidAmount(1000000.0);
        s5.setLevel("Central");
        s5.setApplicableState("All India");
        s5.setMinAge(18);
        s5.setMaxAge(65);
        s5.setEligibleGenders("All");
        s5.setMaxAnnualIncome(2000000.0);
        s5.setEligibleCategories("All");
        s5.setEligibleOccupations("Self Employed / Entrepreneur,Daily Wage / Laborer,Artisan / Weaver,Unemployed");
        s5.setEligibleEducations("All");
        s5.setRequiredDocuments("1. Proof of Identity (Aadhaar / Voter ID / PAN Card)\n2. Proof of Residence\n3. Business Plan / Quotation of machinery or items\n4. Bank account statement of past 6 months\n5. Udyam Registration (for existing units)");
        s5.setApplicationProcedure("1. Prepare a project summary or business plan.\n2. Apply online via Udyami Mitra portal (https://udyamimitra.in) or visit any commercial/Gramin bank.\n3. Complete Mudra application form.\n4. Submit documents. Loan is processed without collateral or third-party guarantee.");
        s5.setOfficialWebsite("https://www.mudra.org.in");
        s5.setHelplineNumber("1800-180-1111");
        s5.setTags("mudra, business loan, entrepreneur, shop, MSME, self employed, startup");
        schemeRepository.save(s5);

        // Scheme 6: Sukanya Samriddhi Yojana
        Scheme s6 = new Scheme();
        s6.setName("Sukanya Samriddhi Yojana (Beti Bachao Beti Padhao)");
        s6.setCode("SSY-BBBP");
        s6.setCategory("Social Welfare & Women");
        s6.setMinistry("Ministry of Women and Child Development");
        s6.setBriefDescription("A government-backed savings scheme for girl children ensuring financial security for higher education and marriage, with high tax-free interest and Section 80C benefits.");
        s6.setBenefits("Government assured high interest rate (currently 8.2% p.a.), triple tax exemption (EEE), partial withdrawal permitted after age 18 for higher education.");
        s6.setFinancialAidAmount(150000.0);
        s6.setLevel("Central");
        s6.setApplicableState("All India");
        s6.setMinAge(0);
        s6.setMaxAge(10);
        s6.setEligibleGenders("Female");
        s6.setMaxAnnualIncome(5000000.0);
        s6.setEligibleCategories("All");
        s6.setEligibleOccupations("All");
        s6.setEligibleEducations("All");
        s6.setRequiredDocuments("1. Birth Certificate of the girl child\n2. Identity Proof of parent/guardian (Aadhaar / PAN)\n3. Address proof of parent/guardian\n4. Passport size photographs");
        s6.setApplicationProcedure("1. Obtain Form-1 from nearest Post Office or authorized Public/Private Bank.\n2. Fill details of child and guardian.\n3. Attach birth certificate and KYC documents.\n4. Deposit initial opening amount (minimum ₹250).\n5. Receive Sukanya Samriddhi account passbook.");
        s6.setOfficialWebsite("https://www.indiapost.gov.in");
        s6.setHelplineNumber("1800-266-6868");
        s6.setTags("girl child, daughter, women, savings, education, sukanya");
        schemeRepository.save(s6);

        // Scheme 7: Stand-Up India Scheme
        Scheme s7 = new Scheme();
        s7.setName("Stand-Up India Scheme for Women and SC/ST Entrepreneurs");
        s7.setCode("STANDUP-INDIA");
        s7.setCategory("Financial Inclusion & Business");
        s7.setMinistry("Ministry of Finance");
        s7.setBriefDescription("Facilitates bank loans between ₹10 Lakh and ₹1 Crore to at least one SC or ST borrower and at least one woman borrower per bank branch for setting up greenfield enterprises.");
        s7.setBenefits("Composite loan (term loan and working capital) between ₹10 Lakhs and ₹1 Crore covering up to 85% of total project cost for manufacturing, services, agri-allied or trading sectors.");
        s7.setFinancialAidAmount(5000000.0);
        s7.setLevel("Central");
        s7.setApplicableState("All India");
        s7.setMinAge(18);
        s7.setMaxAge(70);
        s7.setEligibleGenders("Female");
        s7.setMaxAnnualIncome(10000000.0);
        s7.setEligibleCategories("SC,ST,OBC,General,EWS");
        s7.setEligibleOccupations("Self Employed / Entrepreneur,Artisan / Weaver,Unemployed");
        s7.setEligibleEducations("All");
        s7.setRequiredDocuments("1. Proof of Identity and Address\n2. Caste Certificate (for SC/ST applicants)\n3. Detailed Project Report (DPR)\n4. Balance sheets / Net worth statements\n5. Partnership deed or Memorandum of Association (for companies)");
        s7.setApplicationProcedure("1. Visit https://www.standupmitra.in.\n2. Register as a borrower with greenfield project proposal.\n3. Choose handholding support or direct bank application.\n4. Connect with SIDBI partner branches.\n5. Loan sanction and disbursement.");
        s7.setOfficialWebsite("https://www.standupmitra.in");
        s7.setHelplineNumber("1800-180-1111");
        s7.setTags("women entrepreneur, SC, ST, business loan, startup, greenfield, finance");
        schemeRepository.save(s7);

        // Scheme 8: Divyangjan Swavalamban Scheme
        Scheme s8 = new Scheme();
        s8.setName("Divyangjan Swavalamban Scheme (Livelihood for PwD)");
        s8.setCode("NHFDC-DSS");
        s8.setCategory("Social Welfare & Women");
        s8.setMinistry("Ministry of Social Justice and Empowerment");
        s8.setBriefDescription("Provides concessional financial assistance to Persons with Disabilities (PwDs) for starting income-generating enterprises, skill training, and purchasing assistive devices.");
        s8.setBenefits("Concessional credit up to ₹5,00,000 at low interest rates (5% to 8%), with interest rebate for women with disabilities and prompt repayment.");
        s8.setFinancialAidAmount(500000.0);
        s8.setLevel("Central");
        s8.setApplicableState("All India");
        s8.setMinAge(18);
        s8.setMaxAge(65);
        s8.setEligibleGenders("All");
        s8.setMaxAnnualIncome(500000.0);
        s8.setEligibleCategories("All");
        s8.setEligibleOccupations("All");
        s8.setEligibleEducations("All");
        s8.setRequiresDisability(true);
        s8.setRequiredDocuments("1. Disability Certificate / Unique Disability ID (UDID) Card (40% or more)\n2. Aadhaar Card\n3. Age Proof & Educational Qualification\n4. Income Certificate\n5. Proposed business activity proposal");
        s8.setApplicationProcedure("1. Contact State Channelising Agency (SCA) or participating Regional Rural Bank.\n2. Fill NHFDC loan application form.\n3. Attach UDID disability certificate and project estimate.\n4. Screening and recommendation by District Disability Welfare Officer.\n5. Loan disbursement.");
        s8.setOfficialWebsite("https://nhfdc.nic.in");
        s8.setHelplineNumber("0129-2226910");
        s8.setTags("disability, divyang, PwD, accessible, loan, handicap, welfare");
        schemeRepository.save(s8);

        System.out.println("Initialized 8 core national government schemes successfully!");
    }
}
