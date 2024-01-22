package com.inn.stadium.restImpl;


import com.inn.stadium.konstantet.StadiumConstants;
import com.inn.stadium.rest.EventsRest;
import com.inn.stadium.service.EventsService;
import com.inn.stadium.utils.StadiumUtils;
import com.inn.stadium.wrapper.EventsWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
public class EventsRestImpl implements EventsRest {


    @Autowired
    EventsService eventsService;

    @Override
    public ResponseEntity<String> addNewEvent(Map<String, String> requestMap) {

        try {
            return eventsService.addNewEvent(requestMap);

        } catch (Exception e) {
            e.printStackTrace();
        }
        return StadiumUtils.getResponseEntity(StadiumConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<EventsWrapper>> getAllEvents() {
        try {
            return eventsService.getAllEvents();

        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(),HttpStatus.INTERNAL_SERVER_ERROR);
    }


    @Override
    public ResponseEntity<String> updateEvent(Map<String, String> requestMap) {
        try {
            eventsService.updateEvent(requestMap);

        }catch (Exception e){
            e.printStackTrace();
        }
        return StadiumUtils.getResponseEntity(StadiumConstants.SOMETHING_WENT_WRONG,HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> deleteEvent(Integer id) {
        try {
            eventsService.deleteEvent(id);

        }catch (Exception e){
            e.printStackTrace();
        }
        return StadiumUtils.getResponseEntity(StadiumConstants.SOMETHING_WENT_WRONG,HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> updateStatus(Map<String, String> requestMap) {
        try {
            return eventsService.updateStatus(requestMap);

        }catch (Exception e){
            e.printStackTrace();
        }
        return StadiumUtils.getResponseEntity(StadiumConstants.SOMETHING_WENT_WRONG,HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<EventsWrapper>> getByCategory(Integer id) {
        try {
            return eventsService.getByCategory(id);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(),HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<EventsWrapper> getEventById(Integer id) {
        try {
            return eventsService.getEventById(id);

        }catch (Exception ex){
            ex.printStackTrace();
        }
        return new ResponseEntity<>(new EventsWrapper(),HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
