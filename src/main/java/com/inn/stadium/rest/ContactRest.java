package com.inn.stadium.rest;


import org.springframework.web.bind.annotation.RequestMapping;
import com.inn.stadium.wrapper.ContactWrapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequestMapping(path = "/contact")
public interface ContactRest {

    @PostMapping(path = "/add")
    public ResponseEntity<String> addNewContact(@RequestBody Map<String,String> requestMap);

    @GetMapping(path = "/get")
    public ResponseEntity<List<ContactWrapper>>getAllContact();

    @PostMapping(path = "update")
    public ResponseEntity<String>updateContact(@RequestBody Map<String,String> requestMap);

    @PostMapping(path = "delete/{id}")
    public ResponseEntity<String>deleteContact(@PathVariable Integer id);

    @PostMapping(path = "/updateStatus")
    public ResponseEntity<String>updateStatus(@RequestBody Map<String,String>requestMap);

    @GetMapping(path = "/getById/{id}")
    public ResponseEntity<ContactWrapper>getContactById(@PathVariable Integer id );
}
