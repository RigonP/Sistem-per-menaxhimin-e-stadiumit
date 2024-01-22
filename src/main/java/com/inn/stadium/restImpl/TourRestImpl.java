package com.inn.stadium.restImpl;

import com.inn.stadium.konstantet.StadiumConstants;
import com.inn.stadium.rest.TourRest;
import com.inn.stadium.service.TourService;
import com.inn.stadium.utils.StadiumUtils;
import com.inn.stadium.wrapper.TourWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;



@RestController
public class TourRestImpl implements TourRest {

    @Autowired
    TourService tourService;


    @Override
    public ResponseEntity<String> addNewTour(Map<String, String> requestMap) {
        try{
            return tourService.addNewTour(requestMap);
        }catch (Exception e){
            e.printStackTrace();
        }
        return StadiumUtils.getResponseEntity(StadiumConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<TourWrapper>> getAllTour() {
        try{
            return tourService.getAllTour();
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> updateTour(Map<String, String> requestMap) {
        try{
            return tourService.updateTour(requestMap);
        }catch (Exception e){
            e.printStackTrace();
        }
        return StadiumUtils.getResponseEntity(StadiumConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> deleteTour(Integer id) {
        try{
            return tourService.deleteTour(id);
        }catch (Exception e){
            e.printStackTrace();
        }
        return StadiumUtils.getResponseEntity(StadiumConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<TourWrapper> getById(Integer id) {
        try{
            return tourService.getById(id);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(new TourWrapper(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
