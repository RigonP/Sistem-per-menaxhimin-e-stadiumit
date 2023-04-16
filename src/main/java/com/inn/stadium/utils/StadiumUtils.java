package com.inn.stadium.utils;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class StadiumUtils {

    private StadiumUtils(){

    }
    public static ResponseEntity <String> getResponseEntity(String responseMessage, HttpStatus httpStatus){
        return  new ResponseEntity<String >("{\"messag\":\" " + responseMessage + "\"}", httpStatus);
    }
}
