package com.inn.stadium.service;

import com.inn.stadium.wrapper.KitsWrapper;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface KitsService {

    ResponseEntity<String> addNewKits(Map<String, String> requestMap);


    ResponseEntity<List<KitsWrapper>> getAllKits();

    ResponseEntity<String> updateKits(Map<String, String> requestMap);

    ResponseEntity<String> deleteKits(Integer id);

    ResponseEntity<String> updateStatus(Map<String, String> requestMap);

    ResponseEntity<List<KitsWrapper>> getByProduct(Integer id);

    ResponseEntity<KitsWrapper> getByKitsId(Integer id);
}
