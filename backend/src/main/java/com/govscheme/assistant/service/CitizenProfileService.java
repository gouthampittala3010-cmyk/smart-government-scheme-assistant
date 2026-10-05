package com.govscheme.assistant.service;

import com.govscheme.assistant.dto.CitizenProfileDto;
import com.govscheme.assistant.entity.CitizenProfile;
import com.govscheme.assistant.entity.User;
import com.govscheme.assistant.exception.ResourceNotFoundException;
import com.govscheme.assistant.repository.CitizenProfileRepository;
import com.govscheme.assistant.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class CitizenProfileService {

    private final CitizenProfileRepository citizenProfileRepository;
    private final UserRepository userRepository;

    public CitizenProfileService(CitizenProfileRepository citizenProfileRepository, UserRepository userRepository) {
        this.citizenProfileRepository = citizenProfileRepository;
        this.userRepository = userRepository;
    }

    public CitizenProfileDto getProfileByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));

        CitizenProfile profile = citizenProfileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Profile not found for this user. Please complete your profile."));

        return toDto(profile);
    }

    public CitizenProfile getProfileEntityByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));

        return citizenProfileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Profile not found. Please complete citizen profile first."));
    }

    public boolean hasProfile(String email) {
        return userRepository.findByEmail(email)
                .map(user -> citizenProfileRepository.findByUserId(user.getId()).isPresent())
                .orElse(false);
    }

    @Transactional
    public CitizenProfileDto createOrUpdateProfile(String email, CitizenProfileDto dto) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));

        CitizenProfile profile = citizenProfileRepository.findByUserId(user.getId())
                .orElse(new CitizenProfile());

        profile.setUser(user);
        profile.setAge(dto.getAge());
        profile.setGender(dto.getGender());
        profile.setState(dto.getState());
        profile.setDistrict(dto.getDistrict());
        profile.setAnnualIncome(dto.getAnnualIncome());
        profile.setOccupation(dto.getOccupation());
        profile.setCategory(dto.getCategory());
        profile.setEducation(dto.getEducation());
        profile.setMaritalStatus(dto.getMaritalStatus());
        profile.setDisability(dto.getDisability());
        profile.setDisabilityPercentage(dto.getDisabilityPercentage());
        profile.setMinority(dto.getMinority());
        profile.setRuralUrban(dto.getRuralUrban());
        profile.setBplCardHolder(dto.getBplCardHolder());
        profile.setHasLand(dto.getHasLand());
        profile.setLandHoldingHectares(dto.getLandHoldingHectares());
        profile.setUpdatedAt(LocalDateTime.now());

        CitizenProfile saved = citizenProfileRepository.save(profile);
        return toDto(saved);
    }

    public CitizenProfileDto toDto(CitizenProfile profile) {
        CitizenProfileDto dto = new CitizenProfileDto();
        dto.setId(profile.getId());
        dto.setAge(profile.getAge());
        dto.setGender(profile.getGender());
        dto.setState(profile.getState());
        dto.setDistrict(profile.getDistrict());
        dto.setAnnualIncome(profile.getAnnualIncome());
        dto.setOccupation(profile.getOccupation());
        dto.setCategory(profile.getCategory());
        dto.setEducation(profile.getEducation());
        dto.setMaritalStatus(profile.getMaritalStatus());
        dto.setDisability(profile.getDisability());
        dto.setDisabilityPercentage(profile.getDisabilityPercentage());
        dto.setMinority(profile.getMinority());
        dto.setRuralUrban(profile.getRuralUrban());
        dto.setBplCardHolder(profile.getBplCardHolder());
        dto.setHasLand(profile.getHasLand());
        dto.setLandHoldingHectares(profile.getLandHoldingHectares());
        return dto;
    }
}
