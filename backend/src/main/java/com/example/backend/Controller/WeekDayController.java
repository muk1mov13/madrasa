package com.example.backend.Controller;

import com.example.backend.Services.WeekService.WeekDayService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/weekday")
@RequiredArgsConstructor
public class WeekDayController {
    private final WeekDayService weekDayService;
    @GetMapping("/public")
    public HttpEntity<?> getWeekDays(){
        return weekDayService.getWeekDays();
    }

}
