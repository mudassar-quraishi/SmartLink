package com.smartlink.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import com.smartlink.entity.Url;
import java.util.List;

@Data
@AllArgsConstructor
public class AnalyticsResponse {
    private long totalLinks;
    private long totalClicks;
    private List<Url> recentLinks;
}
