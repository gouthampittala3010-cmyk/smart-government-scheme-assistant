package com.govscheme.assistant.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "schemes")
public class Scheme {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String name;

    @Column(nullable = false, unique = true, length = 50)
    private String code;

    @Column(nullable = false, length = 100)
    private String category; // Agriculture, Healthcare, Education, Housing, Women & Child, etc.

    @Column(nullable = false, length = 200)
    private String ministry;

    @Column(columnDefinition = "TEXT")
    private String briefDescription;

    @Column(columnDefinition = "TEXT")
    private String benefits;

    private Double financialAidAmount;

    @Column(length = 50)
    private String level; // Central or State

    @Column(length = 100)
    private String applicableState; // "All India" or specific state

    // Eligibility Criteria Rules
    private Integer minAge;
    private Integer maxAge;

    @Column(length = 50)
    private String eligibleGenders; // All, Male, Female, Transgender

    private Double maxAnnualIncome;

    @Column(length = 255)
    private String eligibleCategories; // All, or "General,OBC,SC,ST,EWS"

    @Column(length = 255)
    private String eligibleOccupations; // All, or "Farmer,Student,Self Employed"

    @Column(length = 255)
    private String eligibleEducations; // All, or "10th Pass,12th Pass,Graduate"

    private Boolean requiresDisability = false;
    private Boolean requiresMinority = false;
    private Boolean requiresBpl = false;
    private Boolean requiresLand = false;
    private Boolean ruralOnly = false;
    private Boolean urbanOnly = false;

    // Document & Procedure Details
    @Column(columnDefinition = "TEXT")
    private String requiredDocuments; // Comma or newline separated

    @Column(columnDefinition = "TEXT")
    private String applicationProcedure; // Step-by-step guide

    @Column(length = 500)
    private String officialWebsite;

    @Column(length = 100)
    private String helplineNumber;

    @Column(length = 500)
    private String tags;

    private Boolean active = true;

    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt = LocalDateTime.now();

    public Scheme() {
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
