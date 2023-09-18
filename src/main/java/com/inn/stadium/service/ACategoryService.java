package com.inn.stadium.service;

import com.inn.stadium.POJO.ACategory;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface ACategoryService {
    ResponseEntity<String> addNewACategory(Map<String, String> requestMap);

    ResponseEntity<List<ACategory>> getAllACategory(String filterValue);

    ResponseEntity<String> updateACategory(Map<String, String> requestMap);
}
