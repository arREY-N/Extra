package dev.project.extra.repository;

import dev.project.extra.model.Flow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FlowRepository extends JpaRepository<Flow, Long> {
    boolean existsByName(String name);
}
