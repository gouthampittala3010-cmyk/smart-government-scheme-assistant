package com.govscheme.assistant.controller;

import com.govscheme.assistant.dto.CitizenProfileDto;
import com.govscheme.assistant.service.CitizenProfileService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
public class CitizenProfileController {

    private final CitizenProfileService citizenProfileService;

    public CitizenProfileController(CitizenProfileService citizenProfileService) {
        this.citizenProfileService = citizenProfileService;
    }

    @GetMapping
    public ResponseEntity<CitizenProfileDto> getProfile(Authentication authentication) {
        CitizenProfileDto profile = citizenProfileService.getProfileByEmail(authentication.getName());
        return ResponseEntity.ok(profile);
    }

    @PostMapping
    public ResponseEntity<CitizenProfileDto> saveProfile(@Valid @RequestBody CitizenProfileDto dto,
                                                        Authentication authentication) {
        CitizenProfileDto saved = citizenProfileService.createOrUpdateProfile(authentication.getName(), dto);
        return ResponseEntity.ok(saved);
    }
}
