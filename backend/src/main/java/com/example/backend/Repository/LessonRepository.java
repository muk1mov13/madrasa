package com.example.backend.Repository;

import com.example.backend.Entity.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface LessonRepository extends JpaRepository<Lesson, UUID> {


    List<Lesson> findByGroupId(UUID groupId);
}

