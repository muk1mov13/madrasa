package com.example.backend.Services.authService;

import com.example.backend.Entity.User;
import com.example.backend.Repository.UserRepo;
import com.example.backend.payload.request.ReqLogin;
import com.example.backend.security.JwtService;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepo userRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @Override
    public HttpEntity<?> loginUser(ReqLogin reqLogin, HttpServletResponse response) throws IOException {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            reqLogin.getPhone(),
                            reqLogin.getPassword()
                    )
            );

            User user = userRepository.findByPhone(reqLogin.getPhone()).orElseThrow(() -> new UsernameNotFoundException("User not found!"));
            String access_token = jwtService.generateJWT(user);
            Map<String, String> map = new HashMap<>();
            map.put("access_token", access_token);
            if (reqLogin.isRemember_me()) {
                String refresh_token = jwtService.generateJWTRefresh_Token(user);
                map.put("refresh_token", refresh_token);
            }
            return ResponseEntity.ok(map);
        } catch (Exception e) {
            response.setStatus(HttpStatus.NOT_ACCEPTABLE.value());
            response.setContentType("application/json");
            response.getWriter().write("Wrong phone number or password!");
            response.getWriter().close();
            return null;
        }
    }


    @Override
    public HttpEntity<?> refreshToken(String refreshToken, HttpServletResponse response) throws IOException {
        try {
            String phone = jwtService.extractSubjectFromJWT(refreshToken);
            User user = userRepository.findByPhone(phone).orElseThrow(() -> new UsernameNotFoundException("error!!!!!!"));
            String access_token = jwtService.generateJWT(user);
            return ResponseEntity.ok(access_token);
        } catch (ExpiredJwtException | MalformedJwtException e) {
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            response.setContentType("application/json");
            response.getWriter().write("Refresh token has expired");
            response.getWriter().close();
            return null;
        }
    }

    @Override
    public User decode(String token) {
        String phone = jwtService.extractSubjectFromJWT(token);
        User user = userRepository.findByPhone(phone).orElseThrow(() -> new NoSuchElementException("not found"));
        return user;
    }
}
