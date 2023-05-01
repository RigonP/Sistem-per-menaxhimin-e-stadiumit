package com.inn.stadium.rest;

import com.inn.stadium.POJO.Bill;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.Map;

@RequestMapping(path = "/bill")
public interface BillRest {

    @PostMapping(path = "/generateReport")
    public ResponseEntity<String>generateReport(@RequestBody Map<String,Object>requestMap);

    @GetMapping(path = "/getBills")
    public ResponseEntity<List<Bill>>getBills();

    @PostMapping(path = "/getPdf")
    public  ResponseEntity<byte[]> getPdf(@RequestBody Map<String,Object> requestMap);

}
