package com.example.backend.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
public class Rating {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @ManyToOne
    private Subject subject;
    @ManyToOne
    private Student student;
    private Integer mark;

    public Rating(Subject subject, Student student, Integer mark) {
        this.subject = subject;
        this.student = student;
        this.mark = mark;
    }
}
