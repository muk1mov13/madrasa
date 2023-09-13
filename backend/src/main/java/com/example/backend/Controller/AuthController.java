package com.example.backend.Controller;

import com.example.backend.Entity.User;
import com.example.backend.Repository.UserRepo;
import com.example.backend.Services.authService.AuthService;
import com.example.backend.payload.request.ReqLogin;
import com.example.backend.security.CurrentUser;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @GetMapping("/me")
    public HttpEntity<?> getCurrentUser(HttpServletRequest request) {

        String token = request.getHeader("Authorization");

        User user = authService.decode(token);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/login/public")
    public HttpEntity<?> login(@RequestBody ReqLogin reqLogin, HttpServletResponse response) throws IOException {
        return authService.loginUser(reqLogin, response);
    }

//    @PostMapping("/refresh/public")
//    public HttpEntity<?> refreshToken(@RequestParam String refresh_token, HttpServletResponse response) throws IOException {
//        return authService.refreshToken(refresh_token, response);
//    }

}
