package com.inn.stadium.rest;


import com.inn.stadium.POJO.Fans;
import com.inn.stadium.wrapper.FansWrapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequestMapping(path = "fans")
public interface FansRest {

    @PostMapping(path = "/add")
    public ResponseEntity<String> addNewFans(@RequestBody Map<String, String> requestMap);

    @GetMapping(path = "/get")
    public ResponseEntity<List<FansWrapper>> getAllFans();


    @PostMapping(path = "/update")
    public ResponseEntity<String> updateFans(@RequestBody Map<String, String> requestMap);

    @PostMapping(path = "/delete/{id}")
    public ResponseEntity<String> deleteFans(@PathVariable Integer id);

    @GetMapping(path = "/getByFansCategory/{id}")
    public ResponseEntity<List<FansWrapper>> getByCategory (@PathVariable Integer id);

    @GetMapping(path = "/getById")
    public ResponseEntity<FansWrapper> getById(@PathVariable Integer id);
}
