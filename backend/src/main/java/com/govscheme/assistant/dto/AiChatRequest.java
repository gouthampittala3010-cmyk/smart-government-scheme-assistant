package com.govscheme.assistant.dto;

public class AiChatRequest {

    private String message;
    private CitizenProfileDto optionalProfile;

    public AiChatRequest() {
    }

    public AiChatRequest(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public CitizenProfileDto getOptionalProfile() {
        return optionalProfile;
    }

    public void setOptionalProfile(CitizenProfileDto optionalProfile) {
        this.optionalProfile = optionalProfile;
    }
}
