package com.example.backend.Controller;

import com.example.backend.Services.RatingService.RatingService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/rating")
@RequiredArgsConstructor
public class RatingController {
    private final RatingService ratingService;
    @GetMapping
    public void getRating(){
        ratingService.getRating();
    }
}
