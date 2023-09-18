package com.inn.stadium.rest;


import com.inn.stadium.POJO.ACategory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequestMapping(path = "/acategory")
public interface ACategoryRest {


    @PostMapping(path = "/add")
    public ResponseEntity<String> addNewACategory(@RequestBody(required = true) Map<String, String> requestMap);


    @GetMapping(path = "/get")
    public ResponseEntity<List<ACategory>> getAllACategory(@RequestParam(required = false) String filterValue);


    @PostMapping(path = "/update")
    public ResponseEntity<String> updateACategory(@RequestBody(required = true) Map<String, String> requestMap);

}
