package com.example.backend.Repository;

import com.example.backend.Entity.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

public interface SubjectRepo extends JpaRepository<Subject, Integer> {
    List<Subject> findByGroup_IdOrderById(UUID id);
}
