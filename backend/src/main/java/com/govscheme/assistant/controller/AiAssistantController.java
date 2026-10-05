package com.govscheme.assistant.controller;

import com.govscheme.assistant.dto.AiChatRequest;
import com.govscheme.assistant.dto.AiChatResponse;
import com.govscheme.assistant.service.AiAssistantService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
public class AiAssistantController {

    private final AiAssistantService aiAssistantService;

    public AiAssistantController(AiAssistantService aiAssistantService) {
        this.aiAssistantService = aiAssistantService;
    }

    @PostMapping("/ask")
    public ResponseEntity<AiChatResponse> askAssistant(@RequestBody AiChatRequest request) {
        AiChatResponse response = aiAssistantService.processCitizenQuery(request);
        return ResponseEntity.ok(response);
    }
}
