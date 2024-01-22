package com.inn.stadium.rest;


import com.inn.stadium.wrapper.TourWrapper;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequestMapping(path = "/tour")
public interface TourRest {

    @PostMapping(path = "/add")
    public ResponseEntity<String> addNewTour(@RequestBody Map<String, String> requestMap);

    @GetMapping(path = "/get")
    public ResponseEntity<List<TourWrapper>> getAllTour();

    @PostMapping(path = "/update")
    public ResponseEntity<String> updateTour(@RequestBody Map<String, String> requestMap);

    @PostMapping(path = "/delete/{id}")
    public ResponseEntity<String> deleteTour(@PathVariable Integer id);

    @GetMapping(path = "/getById/{id}")
    public ResponseEntity<TourWrapper> getById(@PathVariable Integer id);
}
