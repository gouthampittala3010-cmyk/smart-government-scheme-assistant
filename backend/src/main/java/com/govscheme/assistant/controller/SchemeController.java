package com.govscheme.assistant.controller;

import com.govscheme.assistant.dto.SchemeDto;
import com.govscheme.assistant.service.SchemeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/schemes")
public class SchemeController {

    private final SchemeService schemeService;

    public SchemeController(SchemeService schemeService) {
        this.schemeService = schemeService;
    }

    @GetMapping
    public ResponseEntity<List<SchemeDto>> getAllSchemes() {
        return ResponseEntity.ok(schemeService.getAllActiveSchemes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SchemeDto> getSchemeById(@PathVariable Long id) {
        return ResponseEntity.ok(schemeService.getSchemeById(id));
    }

    @GetMapping("/search")
    public ResponseEntity<List<SchemeDto>> searchSchemes(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String state) {
        return ResponseEntity.ok(schemeService.searchAndFilter(keyword, category, state));
    }

    @GetMapping("/categories")
    public ResponseEntity<List<String>> getCategories() {
        return ResponseEntity.ok(schemeService.getAllCategories());
    }

    @GetMapping("/ministries")
    public ResponseEntity<List<String>> getMinistries() {
        return ResponseEntity.ok(schemeService.getAllMinistries());
    }
}
