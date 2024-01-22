package com.inn.stadium.rest;

import com.inn.stadium.wrapper.REventsWrapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

// Definimi i rrugës bazë për të gjitha kërkesat në këtë interface
@RequestMapping(path = "/revents")
public interface REventRest {

    // Metoda POST për të shtuar një event të ri
    @PostMapping(path = "/add")
    public ResponseEntity<String>addNewEvent(@RequestBody Map<String,String> requestMap);

    // Metoda GET për të marrë të gjitha eventet
    @GetMapping(path = "/get")
    public ResponseEntity<List<REventsWrapper>>getAllEvents();


    // Metoda POST për të përditësuar një event
    @PostMapping(path = "update")
    public ResponseEntity<String>updateEvents(@RequestBody Map<String,String> requestMap);


    // Metoda POST për të fshirë një event me një ID të caktuar
    @PostMapping(path = "/delete/{id}")
    public ResponseEntity<String>deleteEvent(@PathVariable Integer id);


    // Metoda POST për të përditësuar statusin e një eventi
    @PostMapping(path = "updateStatus")
    public ResponseEntity<String>updateStatus(@RequestBody Map<String,String> requestMap);


    // Metoda GET për të marrë eventet në bazë të kategorisë së dhënë
    @GetMapping(path = "/getByCategory/{id}")
    public ResponseEntity<List<REventsWrapper>>getByCategory(@PathVariable Integer id);


    // Metoda GET për të marrë një event me një ID të caktuar
    @GetMapping(path = "/getById/{id}")
    public ResponseEntity<REventsWrapper>getEventById(@PathVariable Integer id);

}
