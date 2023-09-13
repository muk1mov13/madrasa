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
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    @ManyToOne
    private Group group;
    private boolean arxive;
    private String color;
    public Student(String name, Group group, boolean arxive, String color) {

        this.name = name;
        this.group = group;
        this.arxive=arxive;
        this.color=color;
    }
}
