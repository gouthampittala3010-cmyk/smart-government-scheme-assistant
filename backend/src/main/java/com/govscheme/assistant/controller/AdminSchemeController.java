package com.govscheme.assistant.controller;

import com.govscheme.assistant.dto.AdminStatsDto;
import com.govscheme.assistant.dto.SchemeDto;
import com.govscheme.assistant.service.SchemeService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasAuthority('ROLE_ADMIN')")
public class AdminSchemeController {

    private final SchemeService schemeService;

    public AdminSchemeController(SchemeService schemeService) {
        this.schemeService = schemeService;
    }

    @GetMapping("/schemes")
    public ResponseEntity<List<SchemeDto>> getAllSchemes() {
        return ResponseEntity.ok(schemeService.getAllSchemesForAdmin());
    }

    @PostMapping("/schemes")
    public ResponseEntity<SchemeDto> createScheme(@Valid @RequestBody SchemeDto dto) {
        SchemeDto created = schemeService.createScheme(dto);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/schemes/{id}")
    public ResponseEntity<SchemeDto> updateScheme(@PathVariable Long id, @Valid @RequestBody SchemeDto dto) {
        SchemeDto updated = schemeService.updateScheme(id, dto);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/schemes/{id}")
    public ResponseEntity<Map<String, String>> deleteScheme(@PathVariable Long id) {
        schemeService.deleteScheme(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Scheme successfully deleted");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/stats")
    public ResponseEntity<AdminStatsDto> getAdminStats() {
        return ResponseEntity.ok(schemeService.getAdminStats());
    }
}
