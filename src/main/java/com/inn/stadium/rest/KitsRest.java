package com.inn.stadium.rest;

import com.inn.stadium.wrapper.KitsWrapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequestMapping(path = "/kits")
public interface KitsRest {

    @PostMapping(path = "/add")
    public ResponseEntity<String>addNewKits(@RequestBody Map<String,String> requestMap);

    @GetMapping(path = "/get")
    public ResponseEntity<List<KitsWrapper>>getAllKits();

    @PostMapping(path = "update")
    public ResponseEntity<String>updateKits(@RequestBody Map<String,String> requestMap);

    @PostMapping(path = "delete/{id}")
    public ResponseEntity<String>deleteKits(@PathVariable Integer id);

    @PostMapping(path = "updateStatus")
    public ResponseEntity<String>updateStatus(@RequestBody Map<String,String> requestMap);

    @GetMapping(path = "getByProductId/{id}")
    public ResponseEntity<List<KitsWrapper>>getByProduct(@PathVariable Integer id);

    @GetMapping(path = "getByKitsId/{id}")
    public ResponseEntity<KitsWrapper>getByKitsId(@PathVariable Integer id);

}
