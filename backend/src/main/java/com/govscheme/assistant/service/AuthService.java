package com.govscheme.assistant.service;

import com.govscheme.assistant.config.JwtTokenProvider;
import com.govscheme.assistant.dto.AuthRequest;
import com.govscheme.assistant.dto.AuthResponse;
import com.govscheme.assistant.dto.RegisterRequest;
import com.govscheme.assistant.entity.User;
import com.govscheme.assistant.enums.Role;
import com.govscheme.assistant.exception.BadRequestException;
import com.govscheme.assistant.exception.ResourceNotFoundException;
import com.govscheme.assistant.repository.CitizenProfileRepository;
import com.govscheme.assistant.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final CitizenProfileRepository citizenProfileRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;

    public AuthService(UserRepository userRepository,
                       CitizenProfileRepository citizenProfileRepository,
                       PasswordEncoder passwordEncoder,
                       AuthenticationManager authenticationManager,
                       JwtTokenProvider tokenProvider) {
        this.userRepository = userRepository;
        this.citizenProfileRepository = citizenProfileRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.tokenProvider = tokenProvider;
    }

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail().trim().toLowerCase())) {
            throw new BadRequestException("An account with email " + request.getEmail() + " already exists");
        }

        User user = new User();
        user.setFullName(request.getFullName().trim());
        user.setEmail(request.getEmail().trim().toLowerCase());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setPhoneNumber(request.getPhoneNumber());
        user.setRole(request.getRole() != null ? request.getRole() : Role.ROLE_CITIZEN);

        User savedUser = userRepository.save(user);

        String token = tokenProvider.generateTokenFromEmail(savedUser.getEmail(), savedUser.getRole().name());

        return new AuthResponse(
                token,
                savedUser.getId(),
                savedUser.getEmail(),
                savedUser.getFullName(),
                savedUser.getRole().name(),
                false
        );
    }

    public AuthResponse login(AuthRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail().trim().toLowerCase(),
                        request.getPassword()
                )
        );

        String token = tokenProvider.generateToken(authentication);

        User user = userRepository.findByEmail(request.getEmail().trim().toLowerCase())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        boolean profileCompleted = citizenProfileRepository.findByUserId(user.getId()).isPresent();

        return new AuthResponse(
                token,
                user.getId(),
                user.getEmail(),
                user.getFullName(),
                user.getRole().name(),
                profileCompleted
        );
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
    }
}
