package com.smartlink.controller;

import com.smartlink.dto.AuthRequest;
import com.smartlink.entity.User;
import com.smartlink.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserRepository userRepository;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody AuthRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email already in use."));
        }
        
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        
        // Hash the password using BCrypt
        String hashedPassword = BCrypt.hashpw(request.getPassword(), BCrypt.gensalt());
        user.setPassword(hashedPassword);
        
        // As requested: all new registrations will be USER
        user.setRole("USER");
        
        userRepository.save(user);
        
        return ResponseEntity.ok(Map.of(
            "id", user.getId(),
            "name", user.getName(),
            "email", user.getEmail(),
            "role", user.getRole()
        ));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());
        if (userOpt.isPresent() && BCrypt.checkpw(request.getPassword(), userOpt.get().getPassword())) {
            User user = userOpt.get();
            return ResponseEntity.ok(Map.of(
                "token", "mock-jwt-token-" + user.getId(), // A mock token mimicking JWT
                "user", Map.of(
                    "id", user.getId(),
                    "name", user.getName(),
                    "email", user.getEmail(),
                    "role", user.getRole()
                )
            ));
        }
        return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials."));
    }
}
