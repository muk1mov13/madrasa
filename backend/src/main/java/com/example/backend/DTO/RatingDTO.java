package com.example.backend.DTO;

import com.example.backend.Entity.Student;
import com.example.backend.Entity.Subject;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RatingDTO {
    private Integer subjectId;
    private Integer studentId;
    private Integer mark;
}
