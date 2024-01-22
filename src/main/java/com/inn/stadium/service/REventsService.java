package com.inn.stadium.service;

import com.inn.stadium.wrapper.REventsWrapper;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;


//Kjo eshte nje nderfaqe (interface) qe perdoret per menaxhimin e eventeve ne stadium.
public interface REventsService {

    // Metoda per shtimin e nje eventi te ri
    ResponseEntity<String> addNewEvent(Map<String, String> requestMap);

    ResponseEntity<List<REventsWrapper>> getAllEvents();

    ResponseEntity<String> updateEvents(Map<String, String> requestMap);

    ResponseEntity<String> deleteEvent(Integer id);

    ResponseEntity<String> updateStatus(Map<String, String> requestMap);

    ResponseEntity<List<REventsWrapper>> getByCategory(Integer id);

    ResponseEntity<REventsWrapper> getEventById(Integer id);
}
