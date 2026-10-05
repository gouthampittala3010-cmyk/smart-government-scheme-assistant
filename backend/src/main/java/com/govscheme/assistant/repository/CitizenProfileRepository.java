package com.govscheme.assistant.repository;

import com.govscheme.assistant.entity.CitizenProfile;
import com.govscheme.assistant.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CitizenProfileRepository extends JpaRepository<CitizenProfile, Long> {
    Optional<CitizenProfile> findByUserId(Long userId);
    Optional<CitizenProfile> findByUser(User user);
    void deleteByUserId(Long userId);
}
