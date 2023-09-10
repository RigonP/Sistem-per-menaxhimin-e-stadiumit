package com.inn.stadium.restImpl;

import com.inn.stadium.konstantet.StadiumConstants;
import com.inn.stadium.rest.REventRest;
import com.inn.stadium.service.REventsService;
import com.inn.stadium.utils.StadiumUtils;
import com.inn.stadium.wrapper.REventsWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;


@RestController
public class REventsRestImpl implements REventRest {


    @Autowired
    REventsService rEventsService;


    @Override
    public ResponseEntity<String> addNewEvent(Map<String, String> requestMap) {
        try {
            return rEventsService.addNewEvent(requestMap);
        }catch (Exception e){
            e.printStackTrace();
        }
        return StadiumUtils.getResponseEntity(StadiumConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<REventsWrapper>> getAllEvents() {
        try {
            return rEventsService.getAllEvents();
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> updateEvents(Map<String, String> requestMap) {
        try{
            return rEventsService.updateEvents(requestMap);
        }catch (Exception e){
            e.printStackTrace();
        }
        return StadiumUtils.getResponseEntity(StadiumConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> deleteEvent(Integer id) {
        try{
            return rEventsService.deleteEvent(id);
        }catch (Exception e){
            e.printStackTrace();
        }
        return StadiumUtils.getResponseEntity(StadiumConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> updateStatus(Map<String, String> requestMap) {
        try {
            return rEventsService.updateStatus(requestMap);
        }catch (Exception e){
            e.printStackTrace();
        }
        return StadiumUtils.getResponseEntity(StadiumConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<REventsWrapper>> getByCategory(Integer id) {
        try{
            return rEventsService.getByCategory(id);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<REventsWrapper> getEventById(Integer id) {
        try{
            return rEventsService.getEventById(id);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(new REventsWrapper(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

