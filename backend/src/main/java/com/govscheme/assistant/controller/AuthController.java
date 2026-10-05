package com.govscheme.assistant.controller;

import com.govscheme.assistant.dto.AuthRequest;
import com.govscheme.assistant.dto.AuthResponse;
import com.govscheme.assistant.dto.RegisterRequest;
import com.govscheme.assistant.entity.User;
import com.govscheme.assistant.service.AuthService;
import com.govscheme.assistant.service.CitizenProfileService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    private final CitizenProfileService citizenProfileService;

    public AuthController(AuthService authService, CitizenProfileService citizenProfileService) {
        this.authService = authService;
        this.citizenProfileService = citizenProfileService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        AuthResponse response = authService.register(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody AuthRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/me")
    public ResponseEntity<Map<String, Object>> getCurrentUser(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).build();
        }
        User user = authService.getUserByEmail(authentication.getName());
        boolean hasProfile = citizenProfileService.hasProfile(user.getEmail());

        Map<String, Object> resp = new HashMap<>();
        resp.put("userId", user.getId());
        resp.put("email", user.getEmail());
        resp.put("fullName", user.getFullName());
        resp.put("role", user.getRole().name());
        resp.put("phoneNumber", user.getPhoneNumber());
        resp.put("profileCompleted", hasProfile);

        return ResponseEntity.ok(resp);
    }
}
