package com.inn.stadium.serviceImpl;

import com.google.common.base.Strings;
import com.inn.stadium.JWT.JwtFilter;
import com.inn.stadium.POJO.FansCategory;
import com.inn.stadium.konstantet.StadiumConstants;
import com.inn.stadium.repository.FansCategoryDao;
import com.inn.stadium.service.FansCategoryService;
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
public class FansCategoryServiceImpl implements FansCategoryService {

    @Autowired
    FansCategoryDao fansCategoryDao;

    @Autowired
    JwtFilter jwtFilter;


    @Override
    public ResponseEntity<String> addNewFansCategory(Map<String, String> requestMap) {
        try{
            if(jwtFilter.isAdmin() || jwtFilter.isFansCategoryAdmin()){
                if(validateFansCategoryMap(requestMap, false)){
                    fansCategoryDao.save(getFansCategoryFromMap(requestMap, false));
                    return StadiumUtils.getResponseEntity("Fans Category u shtua me sukses", HttpStatus.OK);
                }
            }else{
                return StadiumUtils.getResponseEntity(StadiumConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        return StadiumUtils.getResponseEntity(StadiumConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private FansCategory getFansCategoryFromMap(Map<String, String> requestMap, boolean isAdd) {
        FansCategory fansCategory = new FansCategory();

        if(isAdd){
            fansCategory.setId(Integer.parseInt(requestMap.get("id")));
        }
        fansCategory.setEmri(requestMap.get("emri"));
        return fansCategory;
    }

    private boolean validateFansCategoryMap(Map<String, String> requestMap, boolean validateId) {
        if(requestMap.containsKey("emri")){
            if(requestMap.containsKey("id") && validateId){
                return true;
            }else if(!validateId){
                return true;
            }
        }
        return false;
    }

    @Override
    public ResponseEntity<List<FansCategory>> getAllFansCategory(String filterValue) {
        try{
            if(!Strings.isNullOrEmpty(filterValue) && filterValue.equalsIgnoreCase("true")){
                return new ResponseEntity<List<FansCategory>>(fansCategoryDao.getAllFansCategory(), HttpStatus.OK);
            }
            return new ResponseEntity<>(fansCategoryDao.findAll(), HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<List<FansCategory>>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> updateFansCategory(Map<String, String> requestMap) {
        try {
            if(jwtFilter.isAdmin()){
                if(validateFansCategoryMap(requestMap, true)){
                    Optional optional = fansCategoryDao.findById(Integer.parseInt(requestMap.get("id")));
                    if(!optional.isEmpty()){
                        fansCategoryDao.save(getFansCategoryFromMap(requestMap, true));
                        return StadiumUtils.getResponseEntity("Fans Category u ndryshua me sukses", HttpStatus.OK);
                    }else{
                        return StadiumUtils.getResponseEntity("Fans Category me kete ID nuk ekziston", HttpStatus.OK);
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
