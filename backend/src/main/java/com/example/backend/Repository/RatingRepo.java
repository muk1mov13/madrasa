package com.example.backend.Repository;

import com.example.backend.Entity.Rating;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface RatingRepo extends JpaRepository<Rating, UUID> {
    List<Rating> findByStudentId(Integer id);

    void deleteAllByStudentId(Integer id);
}
