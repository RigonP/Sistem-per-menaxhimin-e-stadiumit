package com.inn.stadium.restImpl;

import com.inn.stadium.POJO.FansCategory;
import com.inn.stadium.konstantet.StadiumConstants;
import com.inn.stadium.rest.FansCategoryRest;
import com.inn.stadium.service.FansCategoryService;
import com.inn.stadium.utils.StadiumUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;


@RestController
public class FansCategoryRestImpl implements FansCategoryRest {

    @Autowired
    FansCategoryService fansCategoryService;


    @Override
    public ResponseEntity<String> addNewFansCategory(Map<String, String> requestMap) {
        try{
            return fansCategoryService.addNewFansCategory(requestMap);
        }catch (Exception e){
            e.printStackTrace();
        }
        return StadiumUtils.getResponseEntity(StadiumConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<FansCategory>> getAllFansCategory(String filterValue) {
        try{
            return fansCategoryService.getAllFansCategory(filterValue);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> updateFansCategory(Map<String, String> requestMap) {
        try{
            return fansCategoryService.updateFansCategory(requestMap);
        }catch (Exception e){
            e.printStackTrace();
        }
        return StadiumUtils.getResponseEntity(StadiumConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
