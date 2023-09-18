package com.inn.stadium.restImpl;

import com.inn.stadium.POJO.ACategory;
import com.inn.stadium.konstantet.StadiumConstants;
import com.inn.stadium.rest.ACategoryRest;
import com.inn.stadium.service.ACategoryService;
import com.inn.stadium.utils.StadiumUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;


@RestController
public class ACategoryRestImpl implements ACategoryRest {

    @Autowired
    ACategoryService aCategoryService;

    @Override
    public ResponseEntity<String> addNewACategory(Map<String, String> requestMap) {
        try{
            return  aCategoryService.addNewACategory(requestMap);
        }catch (Exception e){
            e.printStackTrace();
        }
        return StadiumUtils.getResponseEntity(StadiumConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<ACategory>> getAllACategory(String filterValue) {
        try{
            return aCategoryService.getAllACategory(filterValue);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> updateACategory(Map<String, String> requestMap) {
        try{
            return aCategoryService.updateACategory(requestMap);
        }catch (Exception e){
            e.printStackTrace();
        }
        return StadiumUtils.getResponseEntity(StadiumConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
