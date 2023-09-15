package com.inn.stadium.restImpl;

import com.inn.stadium.POJO.FansCategory;
import com.inn.stadium.rest.FansCategoryRest;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public class FansCategoryRestImpl implements FansCategoryRest {
    @Override
    public ResponseEntity<String> addNewFansCategory(Map<String, String> requestMap) {
        return null;
    }

    @Override
    public ResponseEntity<List<FansCategory>> getAllFansCategory(String filterValue) {
        return null;
    }

    @Override
    public ResponseEntity<String> updateFansCategory(Map<String, String> requestMap) {
        return null;
    }
}
