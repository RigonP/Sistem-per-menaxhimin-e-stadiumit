package com.inn.stadium.serviceImpl;

import com.inn.stadium.JWT.CustomerUserDetailsService;
import com.inn.stadium.JWT.JwtFilter;
import com.inn.stadium.JWT.JwtUtil;
import com.inn.stadium.POJO.User;
import com.inn.stadium.konstantet.StadiumConstants;
import com.inn.stadium.repository.UserDao;
import com.inn.stadium.service.UserService;
import com.inn.stadium.utils.EmailUtils;
import com.inn.stadium.utils.StadiumUtils;
import com.inn.stadium.wrapper.UserWrapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;


import java.util.*;


@Slf4j
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserDao userDao;

    @Autowired
    public AuthenticationManager authenticationManager;

    @Autowired
    JwtUtil jwtUtil;

    @Autowired
    JwtFilter jwtFilter;

    @Autowired
    EmailUtils emailUtils;

    @Autowired
    CustomerUserDetailsService customerUserDetailsService;

    @Override
    public ResponseEntity<String> signUp(Map<String, String> requestMap) {

        log.info("Inside signup {} ", requestMap);

        try {

            if (validateSignUpMap(requestMap)) {
                User user = userDao.findByEmailId(requestMap.get("email"));
                if (Objects.isNull(user)) {
                    userDao.save(getUserFromMap(requestMap));
                    return StadiumUtils.getResponseEntity("Successfully Registered ", HttpStatus.OK);
                } else {
                    return StadiumUtils.getResponseEntity("Email already exists ", HttpStatus.BAD_REQUEST);
                }
            } else {
                return StadiumUtils.getResponseEntity(StadiumConstants.INVALID_DATA, HttpStatus.BAD_REQUEST);
            }
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return  StadiumUtils.getResponseEntity(StadiumConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private boolean validateSignUpMap(Map<String, String> requestMap) {
        if (requestMap.containsKey("name") && requestMap.containsKey("contactNumber")
                && requestMap.containsKey("email") && requestMap.containsKey("password")) {
            return true;
        }
        return false;
    }

        private User getUserFromMap(Map<String ,String >requestMap){

            User user = new User();

            user.setName(requestMap.get("name"));
            user.setContactNumber(requestMap.get("contactNumber"));
            user.setEmail(requestMap.get("email"));
            user.setPassword(requestMap.get("password"));
            user.setStatus("false");
            user.setRole("user");
            return user;
        }

    @Override
    public ResponseEntity<String> login(Map<String, String> requestMap) {
        log.info("Inside login");
        try{
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(requestMap.get("email"),requestMap.get("password"))
            );

            if(auth.isAuthenticated()){
                if(customerUserDetailsService.getUserDetails().getStatus().equalsIgnoreCase("true")){
                    return new ResponseEntity<String>("{\"token\":\""+
                            jwtUtil.generateToken(customerUserDetailsService.getUserDetails().getEmail(),
                            customerUserDetailsService.getUserDetails().getRole()) + "\"}",
                            HttpStatus.OK);
                }else{
                    return  new ResponseEntity<String>("{\"message\":\""+"Wait for admin approval." + "\"}",
                            HttpStatus.BAD_REQUEST);
                }
            }
        }catch (Exception ex){
            log.error("{}",ex);
        }
        return  new ResponseEntity<String>("{\"message\":\""+"Bad Credentials" + "\"}",
                HttpStatus.BAD_REQUEST);
    }

    @Override
    public ResponseEntity<List<UserWrapper>> getAllUser() {
        try{

            if(jwtFilter.isAdmin()){

                return  new ResponseEntity<>(userDao.getAllUser(),HttpStatus.OK);

            }else{
                return  new ResponseEntity<>(new ArrayList<>(),HttpStatus.UNAUTHORIZED);
            }

        }catch (Exception ex){
            ex.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(),HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> update(Map<String, String> requestMap) {
        try{
            if(jwtFilter.isAdmin()){
               Optional<User> optional = userDao.findById(Integer.parseInt(requestMap.get("id")));
               if(!optional.isEmpty()){
                    userDao.updateStatus(requestMap.get("status"),Integer.parseInt(requestMap.get("id")));
                    sendMailToAllAdmin(requestMap.get("status"),optional.get().getEmail(),userDao.getAllAdmin());
                    return StadiumUtils.getResponseEntity("User Status Updated Successfully", HttpStatus.OK);
               }else{
                   return StadiumUtils.getResponseEntity("User id doesn't exist",HttpStatus.OK);
                }


            }else{
                return StadiumUtils.getResponseEntity(StadiumConstants.UNAUTHORIZED_ACCESS,HttpStatus.UNAUTHORIZED);
            }

        }catch (Exception ex){
            ex.printStackTrace();
        }
        return StadiumUtils.getResponseEntity(StadiumConstants.SOMETHING_WENT_WRONG,HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private void sendMailToAllAdmin(String status, String user, List<String> allAdmin) {

        allAdmin.remove(jwtFilter.getCurrentUser());
        if(status!=null && status.equalsIgnoreCase("true")){

            emailUtils.sendSimpleMessage(jwtFilter.getCurrentUser(),"Account Approved by Admin ","USER:- " + user + " \n is approved by \n ADMIN:-" + jwtFilter.getCurrentUser(),allAdmin);

            emailUtils.sendSimpleMessage(jwtFilter.getCurrentUser(),"Account Disabled by Admin ","USER:- " + user + " \n is disabled by \n ADMIN:-" + jwtFilter.getCurrentUser(),allAdmin);


        }else{


        }



    }


}

