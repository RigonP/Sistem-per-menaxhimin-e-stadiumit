package com.inn.stadium.service;

import com.inn.stadium.wrapper.AdministrataWrapper;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface AdministrataService {
    ResponseEntity<String> addNewAdministrata(Map<String, String> requestMap);

    ResponseEntity<List<AdministrataWrapper>> getAllAdministrata();

    ResponseEntity<String> updateAdministrata(Map<String, String> requestMap);

    ResponseEntity<String> deleteAdministrata(Integer id);

    ResponseEntity<AdministrataWrapper> getAdministrataById(Integer id);

    ResponseEntity<List<AdministrataWrapper>> getByACategory(Integer id);
}
