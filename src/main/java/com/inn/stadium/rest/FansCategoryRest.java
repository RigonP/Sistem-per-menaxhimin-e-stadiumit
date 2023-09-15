package com.inn.stadium.rest;


import com.inn.stadium.POJO.FansCategory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequestMapping(path = "/fansCategory")
public interface FansCategoryRest {

    @PostMapping(path = "/add")
    public ResponseEntity<String> addNewFansCategory(@RequestBody(required = true)Map<String, String> requestMap);

    @GetMapping(path = "/get")
    public ResponseEntity<List<FansCategory>> getAllFansCategory(@RequestParam(required = false) String filterValue);

    @PostMapping(path = "/update")
    public ResponseEntity<String> updateFansCategory (@RequestBody(required = true) Map<String, String> requestMap);
}
