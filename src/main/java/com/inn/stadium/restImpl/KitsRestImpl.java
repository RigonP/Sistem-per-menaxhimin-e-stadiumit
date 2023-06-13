package com.inn.stadium.restImpl;

import com.inn.stadium.konstantet.StadiumConstants;
import com.inn.stadium.rest.KitsRest;
import com.inn.stadium.service.KitsService;
import com.inn.stadium.utils.StadiumUtils;
import com.inn.stadium.wrapper.KitsWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
public class KitsRestImpl implements KitsRest {

    @Autowired
    KitsService kitsService;

    @Override
    public ResponseEntity<String> addNewKits(Map<String, String> requestMap) {
        try {
            return kitsService.addNewKits(requestMap);
        }catch (Exception e){
            e.printStackTrace();
        }
        return StadiumUtils.getResponseEntity(StadiumConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<KitsWrapper>> getAllKits() {
        try {
            return kitsService.getAllKits();
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> updateKits(Map<String, String> requestMap) {
      try {
          return kitsService.updateKits(requestMap);
      }catch (Exception e){
          e.printStackTrace();
      }
      return StadiumUtils.getResponseEntity(StadiumConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> deleteKits(Integer id) {
        try{
            return kitsService.deleteKits(id);
        }catch (Exception e){
            e.printStackTrace();
        }
        return StadiumUtils.getResponseEntity(StadiumConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> updateStatus(Map<String, String> requestMap) {
        try {
          return kitsService.updateStatus(requestMap);
        }catch (Exception e){
            e.printStackTrace();
        }
        return StadiumUtils.getResponseEntity(StadiumConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<KitsWrapper>> getByProduct(Integer id) {
        try {
            return kitsService.getByProduct(id);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<KitsWrapper> getByKitsId(Integer id) {
        try {
            return kitsService.getByKitsId(id);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(new KitsWrapper(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
