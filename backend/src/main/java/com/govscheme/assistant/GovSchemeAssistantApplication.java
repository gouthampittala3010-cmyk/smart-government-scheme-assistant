package com.govscheme.assistant;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class GovSchemeAssistantApplication {

    public static void main(String[] args) {
        SpringApplication.run(GovSchemeAssistantApplication.class, args);
        System.out.println("==================================================================");
        System.out.println(" AI-Based Government Scheme Eligibility & Assistance Backend Ready ");
        System.out.println(" Server Port: 8080 | Base URL: http://localhost:8080/api         ");
        System.out.println("==================================================================");
    }
}
