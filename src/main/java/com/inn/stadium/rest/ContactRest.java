package com.inn.stadium.rest;

import org.springframework.web.bind.annotation.RequestMapping;
import com.inn.stadium.wrapper.ContactWrapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

// Kjo është një deklaratë e rrugës bazë për të gjitha kërkesat në këtë kontroller.
@RequestMapping(path = "/contact")
public interface ContactRest {

    // Metoda POST për të shtuar një kontakt të ri duke pranuar një kërkesë me një hartë të dhënash.
    @PostMapping(path = "/add")
    public ResponseEntity<String> addNewContact(@RequestBody Map<String,String> requestMap);

    // Metoda GET për të marrë të gjitha kontaktet dhe kthyer ato në një listë të objekteve ContactWrapper.
    @GetMapping(path = "/get")
    public ResponseEntity<List<ContactWrapper>>getAllContact();

    // Metoda POST për të përditësuar një kontakt duke pranuar një kërkesë me një hartë të dhënash.
    @PostMapping(path = "update")
    public ResponseEntity<String>updateContact(@RequestBody Map<String,String> requestMap);

    // Metoda POST për të fshirë një kontakt duke përdorur një ID të caktuar.
    @PostMapping(path = "delete/{id}")
    public ResponseEntity<String>deleteContact(@PathVariable Integer id);

    // Metoda POST për të përditësuar statusin e një kontakti duke pranuar një kërkesë me një hartë të dhënash.
    @PostMapping(path = "/updateStatus")
    public ResponseEntity<String>updateStatus(@RequestBody Map<String,String>requestMap);

    // Metoda GET për të marrë një kontakt duke përdorur një ID të caktuar dhe kthyer si objekt ContactWrapper.
    @GetMapping(path = "/getById/{id}")
    public ResponseEntity<ContactWrapper>getContactById(@PathVariable Integer id );
}
