package com.inn.stadium.serviceImpl;

import com.google.common.base.Strings;
import com.inn.stadium.JWT.JwtFilter;
import com.inn.stadium.POJO.ACategory;
import com.inn.stadium.konstantet.StadiumConstants;
import com.inn.stadium.repository.ACategoryDao;
import com.inn.stadium.service.ACategoryService;
import com.inn.stadium.utils.StadiumUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;


@Service
public class ACategoryServiceImpl implements ACategoryService {

    @Autowired
    ACategoryDao aCategoryDao;

    @Autowired
    JwtFilter jwtFilter;


    @Override
    public ResponseEntity<String> addNewACategory(Map<String, String> requestMap) {
        try{
            if(jwtFilter.isAdmin()){
                if(validateACategoryMap(requestMap, false)){
                    aCategoryDao.save(getACategoryFromMap(requestMap, false));
                    return StadiumUtils.getResponseEntity("Titulli u shtua me sukses", HttpStatus.OK);
                }
            }else{
                return StadiumUtils.getResponseEntity(StadiumConstants.UNAUTHORIZED_ACCESS, HttpStatus.UNAUTHORIZED);
            }

        }catch (Exception e){
            e.printStackTrace();
        }
        return StadiumUtils.getResponseEntity(StadiumConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private boolean validateACategoryMap(Map<String, String> requestMap, boolean validateId) {
        if(requestMap.containsKey("name")){
            if(requestMap.containsKey("id") && validateId){
                return true;
            }else if(!validateId){
                return true;
            }
        }
        return false;
    }

    private ACategory getACategoryFromMap(Map<String, String> requestMap, boolean isAdd) {
        ACategory aCategory = new ACategory();

        if(isAdd){
            aCategory.setId(Integer.parseInt(requestMap.get("id")));
        }
        aCategory.setName(requestMap.get("name"));
        return aCategory;
    }

    @Override
    public ResponseEntity<List<ACategory>> getAllACategory(String filterValue) {
        try{
            if(!Strings.isNullOrEmpty(filterValue) && filterValue.equalsIgnoreCase("true")){
                return new ResponseEntity<List<ACategory>>(aCategoryDao.getAllACategory(), HttpStatus.OK);
            }
            return new ResponseEntity<>(aCategoryDao.findAll(), HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<List<ACategory>>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> updateACategory(Map<String, String> requestMap) {
        try {
            if(jwtFilter.isAdmin()){
                if(validateACategoryMap(requestMap, true)){
                    Optional optional = aCategoryDao.findById(Integer.parseInt(requestMap.get("id")));
                    if(!optional.isEmpty()){
                        aCategoryDao.save(getACategoryFromMap(requestMap, true));
                        return StadiumUtils.getResponseEntity("Titulli u ndryshua me sukses", HttpStatus.OK);
                    }else{
                        return StadiumUtils.getResponseEntity("Titulli me kete ID nuk ekziston", HttpStatus.OK);
                    }
                }
                return StadiumUtils.getResponseEntity(StadiumConstants.INVALID_DATA, HttpStatus.BAD_REQUEST);
            }else{
                return StadiumUtils.getResponseEntity(StadiumConstants.UNAUTHORIZED_ACCESS, HttpStatus.UNAUTHORIZED);
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        return StadiumUtils.getResponseEntity(StadiumConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
