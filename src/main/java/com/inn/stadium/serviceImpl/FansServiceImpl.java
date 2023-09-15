package com.inn.stadium.serviceImpl;

import com.inn.stadium.JWT.JwtFilter;
import com.inn.stadium.POJO.Fans;
import com.inn.stadium.POJO.FansCategory;
import com.inn.stadium.konstantet.StadiumConstants;
import com.inn.stadium.repository.FansDao;
import com.inn.stadium.service.FansService;
import com.inn.stadium.utils.StadiumUtils;
import com.inn.stadium.wrapper.FansWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;


@Service
public class FansServiceImpl implements FansService {
    @Autowired
    FansDao fansDao;

    @Autowired
    JwtFilter jwtFilter;

    @Override
    public ResponseEntity<String> addNewFans(Map<String, String> requestMap) {
        try{
            if(jwtFilter.isAdmin() || jwtFilter.isFansCategoryAdmin()){
                if(validateFansMap(requestMap, false)){
                    fansDao.save(getFansFromMap(requestMap, false));
                    return StadiumUtils.getResponseEntity("Fans u shtua me sukses !", HttpStatus.OK);
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

    private boolean validateFansMap(Map<String, String> requestMap, boolean validateId) {
        if (requestMap.containsKey("emri")){
            if (requestMap.containsKey("id")){
                return true;
            }else if(!validateId){
                return true;
            }
        }
        return false;
    }

    private Fans getFansFromMap(Map<String, String> requestMap, boolean isAdd) {
        FansCategory fansCategory = new FansCategory();

        fansCategory.setId(Integer.parseInt(requestMap.get("fansCategoryId")));

        Fans fans = new Fans();
        if(isAdd){
            fans.setId(Integer.parseInt(requestMap.get("id")));
        }


        fans.setFansCategory(fansCategory);
        fans.setEmri(requestMap.get("emri"));
        fans.setMbiemri(requestMap.get("mbiemri"));
        fans.setEmail(requestMap.get("email"));
        return fans;
    }

    @Override
    public ResponseEntity<List<FansWrapper>> getAllFans() {
        try{
            return new ResponseEntity<>(fansDao.getAllFans(), HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> updateFans(Map<String, String> requestMap) {
        try{
            if(jwtFilter.isAdmin() || jwtFilter.isFansCategoryAdmin()){
                if(validateFansMap(requestMap, true)){
                    Optional<Fans> optional = fansDao.findById(Integer.parseInt(requestMap.get("id")));

                    if(!optional.isEmpty()){
                        Fans fans = getFansFromMap(requestMap, true);
                        fansDao.save(fans);
                        return StadiumUtils.getResponseEntity("Fans u shtua me sukses !", HttpStatus.OK);
                    }else{
                        return StadiumUtils.getResponseEntity("Fans me kete ID nuk ekziston!", HttpStatus.OK);
                    }
                }
            }else{
                return StadiumUtils.getResponseEntity(StadiumConstants.UNAUTHORIZED_ACCESS, HttpStatus.UNAUTHORIZED);
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        return StadiumUtils.getResponseEntity(StadiumConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> deleteFans(Integer id) {
        try{
            if(jwtFilter.isAdmin() || jwtFilter.isFansCategoryAdmin()){
                Optional optional = fansDao.findById(id);
                if(!optional.isEmpty()){
                    fansDao.deleteById(id);
                    return StadiumUtils.getResponseEntity("Fans u fshie me sukses !", HttpStatus.OK);
                }
                return StadiumUtils.getResponseEntity("Fans me kete id nuk ekziston !", HttpStatus.OK);
            }else{
                return StadiumUtils.getResponseEntity(StadiumConstants.UNAUTHORIZED_ACCESS, HttpStatus.UNAUTHORIZED);
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        return StadiumUtils.getResponseEntity(StadiumConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<FansWrapper>> getByCategory(Integer id) {
        try{
            return new ResponseEntity<>(fansDao.getFansByCategory(id), HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<FansWrapper> getById(Integer id) {
        try{
            return new ResponseEntity<>(fansDao.getFansById(id), HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(new FansWrapper(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
