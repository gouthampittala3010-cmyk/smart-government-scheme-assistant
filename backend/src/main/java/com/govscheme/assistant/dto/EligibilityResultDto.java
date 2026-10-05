package com.govscheme.assistant.dto;

import java.util.ArrayList;
import java.util.List;

public class EligibilityResultDto {

    private SchemeDto scheme;
    private int score; // 0 to 100 percentage
    private String matchStatus; // FULLY_ELIGIBLE, PARTIALLY_ELIGIBLE, NOT_ELIGIBLE
    private boolean eligible; // true if all strict criteria are met
    private int passedCriteriaCount;
    private int totalCriteriaCount;
    private List<CriterionCheckDto> criteriaChecks = new ArrayList<>();
    private List<String> whyEligibleReasons = new ArrayList<>();
    private List<String> whyNotEligibleReasons = new ArrayList<>();
    private List<String> missingRequirements = new ArrayList<>();
    private List<String> requiredDocuments = new ArrayList<>();
    private List<String> applicationSteps = new ArrayList<>();

    public EligibilityResultDto() {
    }

    public SchemeDto getScheme() {
        return scheme;
    }

    public void setScheme(SchemeDto scheme) {
        this.scheme = scheme;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public String getMatchStatus() {
        return matchStatus;
    }

    public void setMatchStatus(String matchStatus) {
        this.matchStatus = matchStatus;
    }

    public boolean isEligible() {
        return eligible;
    }

    public void setEligible(boolean eligible) {
        this.eligible = eligible;
    }

    public int getPassedCriteriaCount() {
        return passedCriteriaCount;
    }

    public void setPassedCriteriaCount(int passedCriteriaCount) {
        this.passedCriteriaCount = passedCriteriaCount;
    }

    public int getTotalCriteriaCount() {
        return totalCriteriaCount;
    }

    public void setTotalCriteriaCount(int totalCriteriaCount) {
        this.totalCriteriaCount = totalCriteriaCount;
    }

    public List<CriterionCheckDto> getCriteriaChecks() {
        return criteriaChecks;
    }

    public void setCriteriaChecks(List<CriterionCheckDto> criteriaChecks) {
        this.criteriaChecks = criteriaChecks;
    }

    public List<String> getWhyEligibleReasons() {
        return whyEligibleReasons;
    }

    public void setWhyEligibleReasons(List<String> whyEligibleReasons) {
        this.whyEligibleReasons = whyEligibleReasons;
    }

    public List<String> getWhyNotEligibleReasons() {
        return whyNotEligibleReasons;
    }

    public void setWhyNotEligibleReasons(List<String> whyNotEligibleReasons) {
        this.whyNotEligibleReasons = whyNotEligibleReasons;
    }

    public List<String> getMissingRequirements() {
        return missingRequirements;
    }

    public void setMissingRequirements(List<String> missingRequirements) {
        this.missingRequirements = missingRequirements;
    }

    public List<String> getRequiredDocuments() {
        return requiredDocuments;
    }

    public void setRequiredDocuments(List<String> requiredDocuments) {
        this.requiredDocuments = requiredDocuments;
    }

    public List<String> getApplicationSteps() {
        return applicationSteps;
    }

    public void setApplicationSteps(List<String> applicationSteps) {
        this.applicationSteps = applicationSteps;
    }
}
