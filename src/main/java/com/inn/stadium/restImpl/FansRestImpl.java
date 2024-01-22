package com.inn.stadium.restImpl;

import com.inn.stadium.konstantet.StadiumConstants;
import com.inn.stadium.rest.FansRest;
import com.inn.stadium.service.FansService;
import com.inn.stadium.utils.StadiumUtils;
import com.inn.stadium.wrapper.FansWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;



@RestController
public class FansRestImpl implements FansRest {

    @Autowired
    FansService fansService;


    @Override
    public ResponseEntity<String> addNewFans(Map<String, String> requestMap) {
        try{
            return fansService.addNewFans(requestMap);
        }catch (Exception e){
            e.printStackTrace();
        }
        return StadiumUtils.getResponseEntity(StadiumConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<FansWrapper>> getAllFans() {
        try{
            return fansService.getAllFans();
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> updateFans(Map<String, String> requestMap) {
        try{
            return fansService.updateFans(requestMap);
        }catch (Exception e){
            e.printStackTrace();
        }
        return StadiumUtils.getResponseEntity(StadiumConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> deleteFans(Integer id) {
        try{
            return fansService.deleteFans(id);
        }catch (Exception e){
            e.printStackTrace();
        }
        return StadiumUtils.getResponseEntity(StadiumConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<FansWrapper>> getByCategory(Integer id) {
        try {
            return fansService.getByCategory(id);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<FansWrapper> getById(Integer id) {
        try{
            return fansService.getById(id);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(new FansWrapper(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
