package com.govscheme.assistant.dto;

import java.util.HashMap;
import java.util.Map;

public class AdminStatsDto {

    private long totalUsers;
    private long totalCitizens;
    private long totalProfiles;
    private long totalSchemes;
    private long activeSchemes;
    private Map<String, Long> categoryCounts = new HashMap<>();

    public AdminStatsDto() {
    }

    public long getTotalUsers() {
        return totalUsers;
    }

    public void setTotalUsers(long totalUsers) {
        this.totalUsers = totalUsers;
    }

    public long getTotalCitizens() {
        return totalCitizens;
    }

    public void setTotalCitizens(long totalCitizens) {
        this.totalCitizens = totalCitizens;
    }

    public long getTotalProfiles() {
        return totalProfiles;
    }

    public void setTotalProfiles(long totalProfiles) {
        this.totalProfiles = totalProfiles;
    }

    public long getTotalSchemes() {
        return totalSchemes;
    }

    public void setTotalSchemes(long totalSchemes) {
        this.totalSchemes = totalSchemes;
    }

    public long getActiveSchemes() {
        return activeSchemes;
    }

    public void setActiveSchemes(long activeSchemes) {
        this.activeSchemes = activeSchemes;
    }

    public Map<String, Long> getCategoryCounts() {
        return categoryCounts;
    }

    public void setCategoryCounts(Map<String, Long> categoryCounts) {
        this.categoryCounts = categoryCounts;
    }
}
