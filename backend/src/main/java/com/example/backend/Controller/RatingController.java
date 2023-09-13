package com.example.backend.Controller;

import com.example.backend.DTO.RatingDTO;
import com.example.backend.Services.RatingService.RatingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("api/rating")
@RequiredArgsConstructor
public class RatingController {
    private final RatingService ratingService;

    @GetMapping("/{id}")
    public HttpEntity<?> getRating(@PathVariable UUID id) {
        return ResponseEntity.ok(ratingService.getRating(id));
    }

    @DeleteMapping("/{id}")
    public void deleteRating(@PathVariable UUID id) {
        ratingService.deleteRating(id);
    }

    @PostMapping
    public HttpEntity<?> addRating(@RequestBody RatingDTO ratingDTO) {
        return ResponseEntity.ok(ratingService.addRating(ratingDTO));

    }

    @PutMapping("/{id}")
    public HttpEntity<?> updateRating(@PathVariable UUID id, @RequestBody RatingDTO ratingDTO) {

        return ResponseEntity.ok(ratingService.updateRating(id, ratingDTO));
    }
}
