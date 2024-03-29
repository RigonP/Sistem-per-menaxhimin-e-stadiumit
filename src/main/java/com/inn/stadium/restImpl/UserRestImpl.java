package com.inn.stadium.restImpl;

import com.inn.stadium.konstantet.StadiumConstants;
import com.inn.stadium.rest.UserRest;
import com.inn.stadium.service.UserService;
import com.inn.stadium.utils.StadiumUtils;
import com.inn.stadium.wrapper.UserWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
public class UserRestImpl implements UserRest {

    @Autowired
    UserService userService;

    @Override
    public ResponseEntity<String> signUp(Map<String, String> requestMap) {
        try{
            return  userService.signUp(requestMap);
        }catch (Exception ex){
            ex.printStackTrace();
        }
      return StadiumUtils.getResponseEntity(StadiumConstants.SOMETHING_WENT_WRONG,HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> login(Map<String, String> requestMap) {
        try{
            return  userService.login (requestMap);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return StadiumUtils.getResponseEntity(StadiumConstants.SOMETHING_WENT_WRONG,HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<UserWrapper>> getAllUser() {
        try{
            return userService.getAllUser();
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return  new ResponseEntity<List<UserWrapper>>(new ArrayList<>(),HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> update(Map<String, String> requestMap) {
        try{

            return userService.update(requestMap);

        }catch (Exception eo){
            eo.printStackTrace();
        }
        return StadiumUtils.getResponseEntity(StadiumConstants.SOMETHING_WENT_WRONG,HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> checkToken() {
        try{
            return userService.checkToken();
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return StadiumUtils.getResponseEntity(StadiumConstants.SOMETHING_WENT_WRONG,HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> changePassword(Map<String, String> requestMap) {
        try{
            return userService.changePassword(requestMap);

        }catch (Exception e){
            e.printStackTrace();
        }
        return StadiumUtils.getResponseEntity(StadiumConstants.SOMETHING_WENT_WRONG,HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> forgotPassword(Map<String, String> requestMap) {
        try{

            return userService.forgotPassword(requestMap);

        }catch (Exception e){
            e.printStackTrace();
        }
        return StadiumUtils.getResponseEntity(StadiumConstants.SOMETHING_WENT_WRONG,HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<UserWrapper> getUserById(Integer id) {
        try {
            return userService.getUserById(id);

        }catch (Exception ex){
            ex.printStackTrace();
        }
        return new ResponseEntity<>(new UserWrapper(),HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
