package com.example.backend.Projection;

import com.example.backend.Entity.Rating;
import com.example.backend.Entity.Student;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponseRating {
   private Student student;

   private List<Rating> getRating;
}
