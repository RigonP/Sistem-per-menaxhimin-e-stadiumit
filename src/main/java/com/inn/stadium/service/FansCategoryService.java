package com.inn.stadium.service;

import org.springframework.http.ResponseEntity;

import java.util.Map;

public interface FansCategoryService {
    ResponseEntity<String> addNewFansCategory(Map<String, String> requestMap);
}
