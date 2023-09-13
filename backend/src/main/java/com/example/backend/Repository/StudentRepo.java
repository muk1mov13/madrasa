package com.example.backend.Repository;

import com.example.backend.Entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface StudentRepo extends JpaRepository<Student, Integer> {
    List<Student> findByGroup_Id(UUID id);

    List<Student> findAllByGroup_IdAndArxiveOrderById(UUID group_id, boolean arxive);
}
