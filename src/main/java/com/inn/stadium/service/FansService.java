package com.inn.stadium.service;

import com.inn.stadium.wrapper.FansWrapper;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface FansService {
    ResponseEntity<String> addNewFans(Map<String, String> requestMap);

    ResponseEntity<List<FansWrapper>> getAllFans();

    ResponseEntity<String> updateFans(Map<String, String> requestMap);

    ResponseEntity<String> deleteFans(Integer id);

    ResponseEntity<List<FansWrapper>> getByCategory(Integer id);

    ResponseEntity<FansWrapper> getById(Integer id);
}
