package com.inn.stadium.rest;

import com.inn.stadium.wrapper.REventsWrapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequestMapping(path = "/revents")
public interface REventRest {

    @PostMapping(path = "/add")
    public ResponseEntity<String>addNewEvent(@RequestBody Map<String, String> requestMap);

    @GetMapping(path = "/get")
    public ResponseEntity<List<REventsWrapper>>getAllEvents();

    @PostMapping(path = "update")
    public ResponseEntity<String>updateEvents(@RequestBody Map<String, String> requestMap);

    @PostMapping(path = "/delete/{id}")
    public ResponseEntity<String>deleteEvent(@PathVariable Integer id);

    @PostMapping(path = "updateStatus")
    public ResponseEntity<String>updateStatus(@RequestBody Map<String, String> requestMap);

    @GetMapping(path = "/getByCategory/{id}")
    public ResponseEntity<List<REventsWrapper>>getByCategory(@PathVariable Integer id);

    @GetMapping(path = "/getById/{id}")
    public ResponseEntity<REventsWrapper>getEventById(@PathVariable Integer id);

}
