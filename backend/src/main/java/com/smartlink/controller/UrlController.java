package com.smartlink.controller;

import com.smartlink.dto.AnalyticsResponse;
import com.smartlink.dto.UrlRequest;
import com.smartlink.service.UrlService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.Map;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class UrlController {

    private final UrlService urlService;

    @PostMapping("/api/shorten")
    public ResponseEntity<Map<String, Object>> shortenUrl(@RequestBody UrlRequest request) {
        if (request.getUrl() == null || request.getUrl().trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "URL must be provided"));
        }
        
        com.smartlink.entity.Url url = urlService.generateShortLink(request.getUrl(), request.getUserId());
        
        return ResponseEntity.ok(Map.of(
            "shortUrl", "http://localhost:8080/" + url.getShortCode(),
            "expiresAt", url.getExpiresAt().toString(),
            "message", "This link will automatically expire in 24 hours."
        ));
    }

    @GetMapping("/{shortCode}")
    public ResponseEntity<Void> redirect(@PathVariable String shortCode) {
        Optional<String> originalUrl = urlService.getOriginalUrlAndIncrementClicks(shortCode);

        // If returned optional is empty, it means doesn't exist OR expired
        if (originalUrl.isPresent()) {
            return ResponseEntity.status(HttpStatus.FOUND)
                    .location(URI.create(originalUrl.get()))
                    .build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/api/analytics")
    public ResponseEntity<AnalyticsResponse> getAnalytics(
            @RequestParam(required = false) Long userId,
            @RequestParam(required = false, defaultValue = "false") boolean isAdmin) {
        return ResponseEntity.ok(urlService.getAnalytics(userId, isAdmin));
    }
}
