package com.govscheme.assistant.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "citizen_profiles")
public class CitizenProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", unique = true, nullable = false)
    private User user;

    private Integer age;

    @Column(length = 20)
    private String gender; // Male, Female, Transgender, All

    @Column(length = 100)
    private String state;

    @Column(length = 100)
    private String district;

    private Double annualIncome;

    @Column(length = 100)
    private String occupation; // Farmer, Student, Daily Wage, Self Employed, Unemployed, etc.

    @Column(length = 50)
    private String category; // General, OBC, SC, ST, EWS

    @Column(length = 100)
    private String education; // 10th Pass, 12th Pass, Graduate, etc.

    @Column(length = 50)
    private String maritalStatus; // Single, Married, Widowed, Divorced

    private Boolean disability = false;

    private Integer disabilityPercentage;

    private Boolean minority = false;

    @Column(length = 30)
    private String ruralUrban; // Rural, Urban, Semi-Urban

    private Boolean bplCardHolder = false;

    private Boolean hasLand = false;

    private Double landHoldingHectares = 0.0;

    private LocalDateTime updatedAt = LocalDateTime.now();

    public CitizenProfile() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
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
        return disabilityPercentage;
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

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
