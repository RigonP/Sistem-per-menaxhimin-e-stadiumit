package com.inn.stadium.service;

import com.inn.stadium.wrapper.EventsWrapper;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;


public interface EventsService {

    ResponseEntity<String> addNewEvent(Map<String, String> requestMap);

    ResponseEntity<List<EventsWrapper>> getAllEvents();
    
    ResponseEntity<String> updateEvent(Map<String, String> requestMap);

    ResponseEntity <String> deleteEvent(Integer id);


    ResponseEntity<String> updateStatus(Map<String, String> requestMap);

    ResponseEntity<List<EventsWrapper>> getByCategory(Integer id);

    ResponseEntity<EventsWrapper> getEventById(Integer id);
}
