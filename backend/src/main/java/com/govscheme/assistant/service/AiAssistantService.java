package com.govscheme.assistant.service;

import com.govscheme.assistant.dto.AiChatRequest;
import com.govscheme.assistant.dto.AiChatResponse;
import com.govscheme.assistant.dto.CitizenProfileDto;
import com.govscheme.assistant.dto.SchemeDto;
import com.govscheme.assistant.entity.Scheme;
import com.govscheme.assistant.repository.SchemeRepository;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class AiAssistantService {

    private final SchemeRepository schemeRepository;
    private final SchemeService schemeService;
    private final EligibilityEngineService eligibilityEngineService;

    public AiAssistantService(SchemeRepository schemeRepository,
                              SchemeService schemeService,
                              EligibilityEngineService eligibilityEngineService) {
        this.schemeRepository = schemeRepository;
        this.schemeService = schemeService;
        this.eligibilityEngineService = eligibilityEngineService;
    }

    public AiChatResponse processCitizenQuery(AiChatRequest request) {
        String query = request.getMessage() != null ? request.getMessage().trim() : "";
        CitizenProfileDto profile = request.getOptionalProfile();

        List<Scheme> allSchemes = schemeRepository.findByActiveTrue();
        List<Scheme> matchedSchemes = new ArrayList<>();

        String lowerQuery = query.toLowerCase();

        // Keyword & intent mapping
        Set<String> targetCategories = new HashSet<>();
        if (lowerQuery.contains("farm") || lowerQuery.contains("kisan") || lowerQuery.contains("crop") || lowerQuery.contains("agriculture") || lowerQuery.contains("land")) {
            targetCategories.add("Agriculture & Rural");
        }
        if (lowerQuery.contains("health") || lowerQuery.contains("hospital") || lowerQuery.contains("ayushman") || lowerQuery.contains("medical") || lowerQuery.contains("treatment")) {
            targetCategories.add("Healthcare & Wellness");
        }
        if (lowerQuery.contains("student") || lowerQuery.contains("scholarship") || lowerQuery.contains("college") || lowerQuery.contains("education") || lowerQuery.contains("school") || lowerQuery.contains("study")) {
            targetCategories.add("Education & Skill");
        }
        if (lowerQuery.contains("house") || lowerQuery.contains("awas") || lowerQuery.contains("home") || lowerQuery.contains("shelter")) {
            targetCategories.add("Housing & Shelter");
        }
        if (lowerQuery.contains("business") || lowerQuery.contains("mudra") || lowerQuery.contains("loan") || lowerQuery.contains("startup") || lowerQuery.contains("entrepreneur")) {
            targetCategories.add("Financial Inclusion & Business");
        }
        if (lowerQuery.contains("women") || lowerQuery.contains("girl") || lowerQuery.contains("daughter") || lowerQuery.contains("sukanya") || lowerQuery.contains("mother")) {
            targetCategories.add("Social Welfare & Women");
        }
        if (lowerQuery.contains("disabilit") || lowerQuery.contains("pwd") || lowerQuery.contains("handicap") || lowerQuery.contains("divyang")) {
            targetCategories.add("Social Welfare & Women");
        }

        // Search in schemes
        for (Scheme s : allSchemes) {
            boolean matchesCategory = targetCategories.stream().anyMatch(cat -> s.getCategory().toLowerCase().contains(cat.toLowerCase()));
            boolean matchesText = s.getName().toLowerCase().contains(lowerQuery)
                    || (s.getBriefDescription() != null && s.getBriefDescription().toLowerCase().contains(lowerQuery))
                    || (s.getTags() != null && s.getTags().toLowerCase().contains(lowerQuery))
                    || (s.getEligibleOccupations() != null && s.getEligibleOccupations().toLowerCase().contains(lowerQuery));

            if (matchesCategory || matchesText) {
                matchedSchemes.add(s);
            }
        }

        if (matchedSchemes.isEmpty()) {
            matchedSchemes = allSchemes.stream().limit(3).collect(Collectors.toList());
        } else if (matchedSchemes.size() > 4) {
            matchedSchemes = matchedSchemes.subList(0, 4);
        }

        List<SchemeDto> recommendedDtos = matchedSchemes.stream()
                .map(schemeService::toDto)
                .collect(Collectors.toList());

        // Construct intelligent conversational reply
        StringBuilder reply = new StringBuilder();
        List<String> followUps = new ArrayList<>();

        reply.append("Hello! Based on your query **\"").append(query).append("\"**, ");

        if (!matchedSchemes.isEmpty()) {
            reply.append("I have analyzed government welfare initiatives and identified **")
                    .append(matchedSchemes.size())
                    .append(" highly relevant scheme(s)**:\n\n");

            for (Scheme s : matchedSchemes) {
                reply.append("• **").append(s.getName()).append("** (").append(s.getMinistry()).append(")\n");
                reply.append("  - **Benefit**: ").append(s.getBenefits() != null ? s.getBenefits() : "Financial & welfare support").append("\n");
                if (s.getRequiredDocuments() != null) {
                    reply.append("  - **Key Documents**: ").append(s.getRequiredDocuments().split("\n")[0]).append("\n");
                }
                reply.append("  - **Official Portal**: ").append(s.getOfficialWebsite() != null ? s.getOfficialWebsite() : "Available on state portal").append("\n\n");
            }

            if (profile != null && profile.getAge() != null) {
                reply.append("\n**Personalized Eligibility Check for Your Profile:**\n");
                reply.append("You are currently configured as a ").append(profile.getAge()).append("-year-old ");
                reply.append(profile.getGender()).append(" resident from ").append(profile.getState()).append(" (");
                reply.append(profile.getOccupation()).append(", ").append(profile.getCategory()).append(" category). ");
                reply.append("Head to our **Eligibility Checker** to get your exact percentage match and detailed requirement audit.");
            } else {
                reply.append("\n**Tip:** Complete your Citizen Profile to get an instant 0–100% eligibility score calculated specifically for you!");
            }

            followUps.add("Check my full eligibility score");
            followUps.add("What documents are needed for " + matchedSchemes.get(0).getName() + "?");
            followUps.add("Show step-by-step application procedure");
        } else {
            reply.append("I could not pinpoint an exact match for those specific keywords, but you can explore all available Central and State schemes in our Schemes Explorer or run the automated Eligibility Checker!");
            followUps.add("Explore all Central schemes");
            followUps.add("Explore student scholarships");
            followUps.add("Check farmer welfare schemes");
        }

        AiChatResponse response = new AiChatResponse();
        response.setResponse(reply.toString());
        response.setRecommendedSchemes(recommendedDtos);
        response.setKeySuggestions(followUps);

        return response;
    }
}
