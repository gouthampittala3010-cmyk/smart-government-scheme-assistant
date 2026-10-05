package com.govscheme.assistant.dto;

import java.util.ArrayList;
import java.util.List;

public class AiChatResponse {

    private String response;
    private List<SchemeDto> recommendedSchemes = new ArrayList<>();
    private List<String> keySuggestions = new ArrayList<>();

    public AiChatResponse() {
    }

    public AiChatResponse(String response) {
        this.response = response;
    }

    public String getResponse() {
        return response;
    }

    public void setResponse(String response) {
        this.response = response;
    }

    public List<SchemeDto> getRecommendedSchemes() {
        return recommendedSchemes;
    }

    public void setRecommendedSchemes(List<SchemeDto> recommendedSchemes) {
        this.recommendedSchemes = recommendedSchemes;
    }

    public List<String> getKeySuggestions() {
        return keySuggestions;
    }

    public void setKeySuggestions(List<String> keySuggestions) {
        this.keySuggestions = keySuggestions;
    }
}
