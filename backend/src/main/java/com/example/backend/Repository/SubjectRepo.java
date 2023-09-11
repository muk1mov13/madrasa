package com.example.backend.Repository;

import com.example.backend.Entity.Subject;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface SubjectRepo extends JpaRepository<Subject, UUID> {
    Subject findByGroup_Id(UUID id);

}
