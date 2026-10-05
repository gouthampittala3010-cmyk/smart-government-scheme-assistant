package com.govscheme.assistant.dto;

import jakarta.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class SchemeDto {

    private Long id;

    @NotBlank(message = "Scheme name is required")
    private String name;

    @NotBlank(message = "Scheme code is required")
    private String code;

    @NotBlank(message = "Category is required")
    private String category;

    @NotBlank(message = "Ministry name is required")
    private String ministry;

    private String briefDescription;
    private String benefits;
    private Double financialAidAmount;
    private String level; // Central or State
    private String applicableState; // "All India" or specific

    // Criteria
    private Integer minAge;
    private Integer maxAge;
    private String eligibleGenders;
    private Double maxAnnualIncome;
    private String eligibleCategories;
    private String eligibleOccupations;
    private String eligibleEducations;
    private Boolean requiresDisability = false;
    private Boolean requiresMinority = false;
    private Boolean requiresBpl = false;
    private Boolean requiresLand = false;
    private Boolean ruralOnly = false;
    private Boolean urbanOnly = false;

    // Documents & Procedure
    private String requiredDocuments;
    private String applicationProcedure;
    private String officialWebsite;
    private String helplineNumber;
    private String tags;
    private Boolean active = true;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public SchemeDto() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getMinistry() {
        return ministry;
    }

    public void setMinistry(String ministry) {
        this.ministry = ministry;
    }

    public String getBriefDescription() {
        return briefDescription;
    }

    public void setBriefDescription(String briefDescription) {
        this.briefDescription = briefDescription;
    }

    public String getBenefits() {
        return benefits;
    }

    public void setBenefits(String benefits) {
        this.benefits = benefits;
    }

    public Double getFinancialAidAmount() {
        return financialAidAmount;
    }

    public void setFinancialAidAmount(Double financialAidAmount) {
        this.financialAidAmount = financialAidAmount;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public String getApplicableState() {
        return applicableState;
    }

    public void setApplicableState(String applicableState) {
        this.applicableState = applicableState;
    }

    public Integer getMinAge() {
        return minAge;
    }

    public void setMinAge(Integer minAge) {
        this.minAge = minAge;
    }

    public Integer getMaxAge() {
        return maxAge;
    }

    public void setMaxAge(Integer maxAge) {
        this.maxAge = maxAge;
    }

    public String getEligibleGenders() {
        return eligibleGenders;
    }

    public void setEligibleGenders(String eligibleGenders) {
        this.eligibleGenders = eligibleGenders;
    }

    public Double getMaxAnnualIncome() {
        return maxAnnualIncome;
    }

    public void setMaxAnnualIncome(Double maxAnnualIncome) {
        this.maxAnnualIncome = maxAnnualIncome;
    }

    public String getEligibleCategories() {
        return eligibleCategories;
    }

    public void setEligibleCategories(String eligibleCategories) {
        this.eligibleCategories = eligibleCategories;
    }

    public String getEligibleOccupations() {
        return eligibleOccupations;
    }

    public void setEligibleOccupations(String eligibleOccupations) {
        this.eligibleOccupations = eligibleOccupations;
    }

    public String getEligibleEducations() {
        return eligibleEducations;
    }

    public void setEligibleEducations(String eligibleEducations) {
        this.eligibleEducations = eligibleEducations;
    }

    public Boolean getRequiresDisability() {
        return requiresDisability != null ? requiresDisability : false;
    }

    public void setRequiresDisability(Boolean requiresDisability) {
        this.requiresDisability = requiresDisability;
    }

    public Boolean getRequiresMinority() {
        return requiresMinority != null ? requiresMinority : false;
    }

    public void setRequiresMinority(Boolean requiresMinority) {
        this.requiresMinority = requiresMinority;
    }

    public Boolean getRequiresBpl() {
        return requiresBpl != null ? requiresBpl : false;
    }

    public void setRequiresBpl(Boolean requiresBpl) {
        this.requiresBpl = requiresBpl;
    }

    public Boolean getRequiresLand() {
        return requiresLand != null ? requiresLand : false;
    }

    public void setRequiresLand(Boolean requiresLand) {
        this.requiresLand = requiresLand;
    }

    public Boolean getRuralOnly() {
        return ruralOnly != null ? ruralOnly : false;
    }

    public void setRuralOnly(Boolean ruralOnly) {
        this.ruralOnly = ruralOnly;
    }

    public Boolean getUrbanOnly() {
        return urbanOnly != null ? urbanOnly : false;
    }

    public void setUrbanOnly(Boolean urbanOnly) {
        this.urbanOnly = urbanOnly;
    }

    public String getRequiredDocuments() {
        return requiredDocuments;
    }

    public void setRequiredDocuments(String requiredDocuments) {
        this.requiredDocuments = requiredDocuments;
    }

    public String getApplicationProcedure() {
        return applicationProcedure;
    }

    public void setApplicationProcedure(String applicationProcedure) {
        this.applicationProcedure = applicationProcedure;
    }

    public String getOfficialWebsite() {
        return officialWebsite;
    }

    public void setOfficialWebsite(String officialWebsite) {
        this.officialWebsite = officialWebsite;
    }

    public String getHelplineNumber() {
        return helplineNumber;
    }

    public void setHelplineNumber(String helplineNumber) {
        this.helplineNumber = helplineNumber;
    }

    public String getTags() {
        return tags;
    }

    public void setTags(String tags) {
        this.tags = tags;
    }

    public Boolean getActive() {
        return active != null ? active : true;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
