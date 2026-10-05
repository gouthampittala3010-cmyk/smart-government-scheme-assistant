package com.govscheme.assistant.dto;

public class CriterionCheckDto {

    private String criterionName;
    private String requiredRule;
    private String citizenValue;
    private boolean passed;
    private String reason;

    public CriterionCheckDto() {
    }

    public CriterionCheckDto(String criterionName, String requiredRule, String citizenValue, boolean passed, String reason) {
        this.criterionName = criterionName;
        this.requiredRule = requiredRule;
        this.citizenValue = citizenValue;
        this.passed = passed;
        this.reason = reason;
    }

    public String getCriterionName() {
        return criterionName;
    }

    public void setCriterionName(String criterionName) {
        this.criterionName = criterionName;
    }

    public String getRequiredRule() {
        return requiredRule;
    }

    public void setRequiredRule(String requiredRule) {
        this.requiredRule = requiredRule;
    }

    public String getCitizenValue() {
        return citizenValue;
    }

    public void setCitizenValue(String citizenValue) {
        this.citizenValue = citizenValue;
    }

    public boolean isPassed() {
        return passed;
    }

    public void setPassed(boolean passed) {
        this.passed = passed;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
}
