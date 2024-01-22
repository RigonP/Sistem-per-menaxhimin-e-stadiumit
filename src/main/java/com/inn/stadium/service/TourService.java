package com.inn.stadium.service;

import com.inn.stadium.wrapper.TourWrapper;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface TourService {
    ResponseEntity<String> addNewTour(Map<String, String> requestMap);

    ResponseEntity<List<TourWrapper>> getAllTour();

    ResponseEntity<String> updateTour(Map<String, String> requestMap);

    ResponseEntity<String> deleteTour(Integer id);

    ResponseEntity<TourWrapper> getById(Integer id);
}
