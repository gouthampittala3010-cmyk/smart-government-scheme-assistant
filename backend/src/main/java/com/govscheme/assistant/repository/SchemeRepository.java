package com.govscheme.assistant.repository;

import com.govscheme.assistant.entity.Scheme;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SchemeRepository extends JpaRepository<Scheme, Long> {

    List<Scheme> findByActiveTrue();

    Optional<Scheme> findByCode(String code);

    boolean existsByCode(String code);

    @Query("SELECT s FROM Scheme s WHERE s.active = true " +
           "AND (:category IS NULL OR :category = '' OR LOWER(s.category) = LOWER(:category)) " +
           "AND (:state IS NULL OR :state = '' OR s.applicableState = 'All India' OR LOWER(s.applicableState) = LOWER(:state)) " +
           "AND (:keyword IS NULL OR :keyword = '' OR " +
           "     LOWER(s.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "     LOWER(s.briefDescription) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "     LOWER(s.ministry) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "     LOWER(s.tags) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    List<Scheme> searchSchemes(
            @Param("keyword") String keyword,
            @Param("category") String category,
            @Param("state") String state
    );

    @Query("SELECT DISTINCT s.category FROM Scheme s WHERE s.active = true")
    List<String> findDistinctCategories();

    @Query("SELECT DISTINCT s.ministry FROM Scheme s WHERE s.active = true")
    List<String> findDistinctMinistries();

    long countByActiveTrue();
}
