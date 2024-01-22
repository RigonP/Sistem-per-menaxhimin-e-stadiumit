package com.inn.stadium.rest;


import com.inn.stadium.wrapper.EventsWrapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequestMapping(path = "/events")
public interface EventsRest {

    @PostMapping(path = "/add")
    public ResponseEntity<String> addNewEvent(@RequestBody Map<String,String> requestMap);

    @GetMapping(path = "/get")
    public ResponseEntity<List<EventsWrapper>>getAllEvents();

    @PostMapping(path = "/update")
    public ResponseEntity<String>updateEvent(@RequestBody Map<String,String> requestMap);

    @PostMapping(path = "/delete/{id}")
    public ResponseEntity<String>deleteEvent(@PathVariable Integer id);

    @PostMapping(path = "/updateStatus")
    public ResponseEntity<String>updateStatus(@RequestBody Map<String,String>requestMap);


    @GetMapping(path = "/getByCategory/{id}")
    public ResponseEntity<List<EventsWrapper>>getByCategory(@PathVariable Integer id);

    @GetMapping(path = "/getById/{id}")
    public ResponseEntity<EventsWrapper>getEventById(@PathVariable Integer id );



}
