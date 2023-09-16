package com.inn.stadium.rest;

import com.inn.stadium.wrapper.AdministrataWrapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequestMapping(path = "/administrata")
public interface AdministrataRest {

    @PostMapping(path = "/add")
    public ResponseEntity<String>addNewAdminstrata(@RequestBody Map<String, String> requestMap);

    @GetMapping(path = "/get")
    public ResponseEntity<List<AdministrataWrapper>>getAllAdministrata();

    @PostMapping(path = "/update")
    public ResponseEntity<String> updateAdminstrata(@RequestBody Map<String, String> requestMap);

    @PostMapping(path = "/delete/{id}")
    public ResponseEntity<String> deleteAdministrata(@PathVariable Integer id);

    @GetMapping(path = "/getById/{id}")
    public ResponseEntity<AdministrataWrapper> getAdministrataById(@PathVariable Integer id);


}
