package com.govscheme.assistant.controller;

import com.govscheme.assistant.dto.CitizenProfileDto;
import com.govscheme.assistant.dto.EligibilityResultDto;
import com.govscheme.assistant.entity.CitizenProfile;
import com.govscheme.assistant.entity.Scheme;
import com.govscheme.assistant.repository.SchemeRepository;
import com.govscheme.assistant.service.CitizenProfileService;
import com.govscheme.assistant.service.EligibilityEngineService;
import com.govscheme.assistant.service.SchemeService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/eligibility")
public class EligibilityController {

    private final EligibilityEngineService eligibilityEngineService;
    private final CitizenProfileService citizenProfileService;
    private final SchemeRepository schemeRepository;

    public EligibilityController(EligibilityEngineService eligibilityEngineService,
                                 CitizenProfileService citizenProfileService,
                                 SchemeRepository schemeRepository) {
        this.eligibilityEngineService = eligibilityEngineService;
        this.citizenProfileService = citizenProfileService;
        this.schemeRepository = schemeRepository;
    }

    @GetMapping("/check")
    public ResponseEntity<List<EligibilityResultDto>> checkUserEligibility(Authentication authentication) {
        List<EligibilityResultDto> results = eligibilityEngineService.checkEligibilityForUser(authentication.getName());
        return ResponseEntity.ok(results);
    }

    @PostMapping("/check-anonymous")
    public ResponseEntity<List<EligibilityResultDto>> checkAnonymousEligibility(@Valid @RequestBody CitizenProfileDto profile) {
        List<EligibilityResultDto> results = eligibilityEngineService.checkEligibilityForProfile(profile);
        return ResponseEntity.ok(results);
    }

    @GetMapping("/scheme/{schemeId}")
    public ResponseEntity<EligibilityResultDto> checkSingleSchemeEligibility(@PathVariable Long schemeId,
                                                                             Authentication authentication) {
        Scheme scheme = schemeRepository.findById(schemeId)
                .orElseThrow(() -> new RuntimeException("Scheme not found with ID: " + schemeId));
        CitizenProfile profile = citizenProfileService.getProfileEntityByEmail(authentication.getName());
        CitizenProfileDto profileDto = citizenProfileService.toDto(profile);
        EligibilityResultDto result = eligibilityEngineService.evaluateSchemeEligibility(scheme, profileDto);
        return ResponseEntity.ok(result);
    }
}
