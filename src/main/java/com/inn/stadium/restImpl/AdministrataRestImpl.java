package com.inn.stadium.restImpl;

import com.inn.stadium.konstantet.StadiumConstants;
import com.inn.stadium.rest.AdministrataRest;
import com.inn.stadium.service.AdministrataService;
import com.inn.stadium.utils.StadiumUtils;
import com.inn.stadium.wrapper.AdministrataWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;


@RestController
public class AdministrataRestImpl implements AdministrataRest {

    @Autowired
    AdministrataService administrataService;

    @Override
    public ResponseEntity<String> addNewAdminstrata(Map<String, String> requestMap) {
        try {
            return administrataService.addNewAdministrata(requestMap);
        }catch (Exception e){
            e.printStackTrace();
        }
        return StadiumUtils.getResponseEntity(StadiumConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<AdministrataWrapper>> getAllAdministrata() {
        try {
            return administrataService.getAllAdministrata();
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> updateAdminstrata(Map<String, String> requestMap) {
        try{
            return administrataService.updateAdministrata(requestMap);
        }catch (Exception e){
            e.printStackTrace();
        }
        return StadiumUtils.getResponseEntity(StadiumConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> deleteAdministrata(Integer id) {
        try{
            return administrataService.deleteAdministrata(id);
        }catch (Exception e){
            e.printStackTrace();
        }
        return StadiumUtils.getResponseEntity(StadiumConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<AdministrataWrapper> getAdministrataById(Integer id) {
        try{
            return administrataService.getAdministrataById(id);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(new AdministrataWrapper(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
