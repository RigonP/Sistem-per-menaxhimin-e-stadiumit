package com.inn.stadium.service;

import com.inn.stadium.POJO.FansCategory;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface FansCategoryService {
    ResponseEntity<String> addNewFansCategory(Map<String, String> requestMap);

    ResponseEntity<List<FansCategory>> getAllFansCategory(String filterValue);

    ResponseEntity<String> updateFansCategory(Map<String, String> requestMap);
}
