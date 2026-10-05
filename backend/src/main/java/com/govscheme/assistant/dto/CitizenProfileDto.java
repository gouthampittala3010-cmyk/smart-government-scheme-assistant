package com.govscheme.assistant.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class CitizenProfileDto {

    private Long id;

    @NotNull(message = "Age is required")
    @Min(value = 0, message = "Age cannot be negative")
    @Max(value = 125, message = "Age must be valid")
    private Integer age;

    @NotBlank(message = "Gender is required")
    private String gender;

    @NotBlank(message = "State is required")
    private String state;

    private String district;

    @NotNull(message = "Annual income is required")
    @Min(value = 0, message = "Income cannot be negative")
    private Double annualIncome;

    @NotBlank(message = "Occupation is required")
    private String occupation;

    @NotBlank(message = "Category is required")
    private String category; // General, OBC, SC, ST, EWS

    @NotBlank(message = "Education qualification is required")
    private String education;

    private String maritalStatus = "Single";

    private Boolean disability = false;

    private Integer disabilityPercentage = 0;

    private Boolean minority = false;

    private String ruralUrban = "Rural";

    private Boolean bplCardHolder = false;

    private Boolean hasLand = false;

    private Double landHoldingHectares = 0.0;

    public CitizenProfileDto() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public Double getAnnualIncome() {
        return annualIncome;
    }

    public void setAnnualIncome(Double annualIncome) {
        this.annualIncome = annualIncome;
    }

    public String getOccupation() {
        return occupation;
    }

    public void setOccupation(String occupation) {
        this.occupation = occupation;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getEducation() {
        return education;
    }

    public void setEducation(String education) {
        this.education = education;
    }

    public String getMaritalStatus() {
        return maritalStatus;
    }

    public void setMaritalStatus(String maritalStatus) {
        this.maritalStatus = maritalStatus;
    }

    public Boolean getDisability() {
        return disability != null ? disability : false;
    }

    public void setDisability(Boolean disability) {
        this.disability = disability;
    }

    public Integer getDisabilityPercentage() {
        return disabilityPercentage != null ? disabilityPercentage : 0;
    }

    public void setDisabilityPercentage(Integer disabilityPercentage) {
        this.disabilityPercentage = disabilityPercentage;
    }

    public Boolean getMinority() {
        return minority != null ? minority : false;
    }

    public void setMinority(Boolean minority) {
        this.minority = minority;
    }

    public String getRuralUrban() {
        return ruralUrban;
    }

    public void setRuralUrban(String ruralUrban) {
        this.ruralUrban = ruralUrban;
    }

    public Boolean getBplCardHolder() {
        return bplCardHolder != null ? bplCardHolder : false;
    }

    public void setBplCardHolder(Boolean bplCardHolder) {
        this.bplCardHolder = bplCardHolder;
    }

    public Boolean getHasLand() {
        return hasLand != null ? hasLand : false;
    }

    public void setHasLand(Boolean hasLand) {
        this.hasLand = hasLand;
    }

    public Double getLandHoldingHectares() {
        return landHoldingHectares != null ? landHoldingHectares : 0.0;
    }

    public void setLandHoldingHectares(Double landHoldingHectares) {
        this.landHoldingHectares = landHoldingHectares;
    }
}
