package com.govscheme.assistant.service;

import com.govscheme.assistant.dto.AdminStatsDto;
import com.govscheme.assistant.dto.SchemeDto;
import com.govscheme.assistant.entity.Scheme;
import com.govscheme.assistant.enums.Role;
import com.govscheme.assistant.exception.BadRequestException;
import com.govscheme.assistant.exception.ResourceNotFoundException;
import com.govscheme.assistant.repository.CitizenProfileRepository;
import com.govscheme.assistant.repository.SchemeRepository;
import com.govscheme.assistant.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class SchemeService {

    private final SchemeRepository schemeRepository;
    private final UserRepository userRepository;
    private final CitizenProfileRepository citizenProfileRepository;

    public SchemeService(SchemeRepository schemeRepository,
                         UserRepository userRepository,
                         CitizenProfileRepository citizenProfileRepository) {
        this.schemeRepository = schemeRepository;
        this.userRepository = userRepository;
        this.citizenProfileRepository = citizenProfileRepository;
    }

    public List<SchemeDto> getAllActiveSchemes() {
        return schemeRepository.findByActiveTrue().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public List<SchemeDto> getAllSchemesForAdmin() {
        return schemeRepository.findAll().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public SchemeDto getSchemeById(Long id) {
        Scheme scheme = schemeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Scheme not found with ID: " + id));
        return toDto(scheme);
    }

    public List<SchemeDto> searchAndFilter(String keyword, String category, String state) {
        return schemeRepository.searchSchemes(keyword, category, state).stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public List<String> getAllCategories() {
        return schemeRepository.findDistinctCategories();
    }

    public List<String> getAllMinistries() {
        return schemeRepository.findDistinctMinistries();
    }

    @Transactional
    public SchemeDto createScheme(SchemeDto dto) {
        if (schemeRepository.existsByCode(dto.getCode().trim().toUpperCase())) {
            throw new BadRequestException("Scheme with code " + dto.getCode() + " already exists");
        }

        Scheme scheme = new Scheme();
        mapDtoToEntity(dto, scheme);
        scheme.setCode(dto.getCode().trim().toUpperCase());
        scheme.setCreatedAt(LocalDateTime.now());
        scheme.setUpdatedAt(LocalDateTime.now());

        Scheme saved = schemeRepository.save(scheme);
        return toDto(saved);
    }

    @Transactional
    public SchemeDto updateScheme(Long id, SchemeDto dto) {
        Scheme scheme = schemeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Scheme not found with ID: " + id));

        mapDtoToEntity(dto, scheme);
        scheme.setUpdatedAt(LocalDateTime.now());

        Scheme updated = schemeRepository.save(scheme);
        return toDto(updated);
    }

    @Transactional
    public void deleteScheme(Long id) {
        Scheme scheme = schemeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Scheme not found with ID: " + id));
        schemeRepository.delete(scheme);
    }

    public AdminStatsDto getAdminStats() {
        AdminStatsDto stats = new AdminStatsDto();
        stats.setTotalUsers(userRepository.count());
        stats.setTotalCitizens(userRepository.countByRole(Role.ROLE_CITIZEN));
        stats.setTotalProfiles(citizenProfileRepository.count());
        stats.setTotalSchemes(schemeRepository.count());
        stats.setActiveSchemes(schemeRepository.countByActiveTrue());

        Map<String, Long> categoryCounts = schemeRepository.findAll().stream()
                .collect(Collectors.groupingBy(Scheme::getCategory, Collectors.counting()));
        stats.setCategoryCounts(categoryCounts);

        return stats;
    }

    private void mapDtoToEntity(SchemeDto dto, Scheme scheme) {
        scheme.setName(dto.getName());
        if (dto.getCode() != null) {
            scheme.setCode(dto.getCode().trim().toUpperCase());
        }
        scheme.setCategory(dto.getCategory());
        scheme.setMinistry(dto.getMinistry());
        scheme.setBriefDescription(dto.getBriefDescription());
        scheme.setBenefits(dto.getBenefits());
        scheme.setFinancialAidAmount(dto.getFinancialAidAmount());
        scheme.setLevel(dto.getLevel());
        scheme.setApplicableState(dto.getApplicableState());
        scheme.setMinAge(dto.getMinAge());
        scheme.setMaxAge(dto.getMaxAge());
        scheme.setEligibleGenders(dto.getEligibleGenders());
        scheme.setMaxAnnualIncome(dto.getMaxAnnualIncome());
        scheme.setEligibleCategories(dto.getEligibleCategories());
        scheme.setEligibleOccupations(dto.getEligibleOccupations());
        scheme.setEligibleEducations(dto.getEligibleEducations());
        scheme.setRequiresDisability(dto.getRequiresDisability());
        scheme.setRequiresMinority(dto.getRequiresMinority());
        scheme.setRequiresBpl(dto.getRequiresBpl());
        scheme.setRequiresLand(dto.getRequiresLand());
        scheme.setRuralOnly(dto.getRuralOnly());
        scheme.setUrbanOnly(dto.getUrbanOnly());
        scheme.setRequiredDocuments(dto.getRequiredDocuments());
        scheme.setApplicationProcedure(dto.getApplicationProcedure());
        scheme.setOfficialWebsite(dto.getOfficialWebsite());
        scheme.setHelplineNumber(dto.getHelplineNumber());
        scheme.setTags(dto.getTags());
        scheme.setActive(dto.getActive() != null ? dto.getActive() : true);
    }

    public SchemeDto toDto(Scheme scheme) {
        SchemeDto dto = new SchemeDto();
        dto.setId(scheme.getId());
        dto.setName(scheme.getName());
        dto.setCode(scheme.getCode());
        dto.setCategory(scheme.getCategory());
        dto.setMinistry(scheme.getMinistry());
        dto.setBriefDescription(scheme.getBriefDescription());
        dto.setBenefits(scheme.getBenefits());
        dto.setFinancialAidAmount(scheme.getFinancialAidAmount());
        dto.setLevel(scheme.getLevel());
        dto.setApplicableState(scheme.getApplicableState());
        dto.setMinAge(scheme.getMinAge());
        dto.setMaxAge(scheme.getMaxAge());
        dto.setEligibleGenders(scheme.getEligibleGenders());
        dto.setMaxAnnualIncome(scheme.getMaxAnnualIncome());
        dto.setEligibleCategories(scheme.getEligibleCategories());
        dto.setEligibleOccupations(scheme.getEligibleOccupations());
        dto.setEligibleEducations(scheme.getEligibleEducations());
        dto.setRequiresDisability(scheme.getRequiresDisability());
        dto.setRequiresMinority(scheme.getRequiresMinority());
        dto.setRequiresBpl(scheme.getRequiresBpl());
        dto.setRequiresLand(scheme.getRequiresLand());
        dto.setRuralOnly(scheme.getRuralOnly());
        dto.setUrbanOnly(scheme.getUrbanOnly());
        dto.setRequiredDocuments(scheme.getRequiredDocuments());
        dto.setApplicationProcedure(scheme.getApplicationProcedure());
        dto.setOfficialWebsite(scheme.getOfficialWebsite());
        dto.setHelplineNumber(scheme.getHelplineNumber());
        dto.setTags(scheme.getTags());
        dto.setActive(scheme.getActive());
        dto.setCreatedAt(scheme.getCreatedAt());
        dto.setUpdatedAt(scheme.getUpdatedAt());
        return dto;
    }
}
