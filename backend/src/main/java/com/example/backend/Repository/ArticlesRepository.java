package com.example.backend.Repository;

import com.example.backend.Entity.Articles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ArticlesRepository extends JpaRepository<Articles, UUID> {

    @Query(value = "SELECT * FROM articles WHERE type = ?1 ORDER BY created_at DESC", nativeQuery = true)
    Optional<List<Articles>> findAllByTypeOrderByCreated_atDesc(String type);

}
