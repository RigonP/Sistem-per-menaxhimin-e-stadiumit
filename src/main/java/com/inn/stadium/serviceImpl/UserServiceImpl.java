package com.inn.stadium.serviceImpl;

import com.inn.stadium.POJO.User;
import com.inn.stadium.konstantet.StadiumConstants;
import com.inn.stadium.dao.UserDao;
import com.inn.stadium.service.UserService;
import com.inn.stadium.utils.StadiumUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Objects;

@Slf4j
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserDao userDao;
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

}

