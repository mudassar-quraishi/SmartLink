package com.smartlink.service;

import com.smartlink.dto.AnalyticsResponse;
import com.smartlink.entity.Url;
import com.smartlink.repository.UrlRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UrlService {

    private final UrlRepository urlRepository;

    public Url generateShortLink(String originalUrl) {
        String shortCode;
        do {
            shortCode = UUID.randomUUID().toString().replace("-", "").substring(0, 6);
        } while (urlRepository.findByShortCode(shortCode).isPresent());

        Url url = new Url(shortCode, originalUrl);
        urlRepository.save(url);
        
        return url;
    }

    public Optional<String> getOriginalUrlAndIncrementClicks(String shortCode) {
        Optional<Url> urlOpt = urlRepository.findByShortCode(shortCode);
        if (urlOpt.isPresent()) {
            Url url = urlOpt.get();
            
            // Check expiry
            if (url.getExpiresAt().isBefore(LocalDateTime.now())) {
                return Optional.empty(); // Expired
            }
            
            url.setClicks(url.getClicks() + 1);
            urlRepository.save(url);
            return Optional.of(url.getOriginalUrl());
        }
        return Optional.empty();
    }
    
    public AnalyticsResponse getAnalytics() {
        List<Url> allLinks = urlRepository.findAll();
                
        long totalLinks = allLinks.size();
        long totalClicks = allLinks.stream().mapToLong(Url::getClicks).sum();
        
        List<Url> recentLinks = urlRepository.findTop10ByOrderByCreatedAtDesc();
        
        return new AnalyticsResponse(totalLinks, totalClicks, recentLinks);
    }
}
