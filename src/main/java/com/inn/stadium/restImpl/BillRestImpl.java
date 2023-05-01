package com.inn.stadium.restImpl;

import com.inn.stadium.POJO.Bill;
import com.inn.stadium.konstantet.StadiumConstants;
import com.inn.stadium.rest.BillRest;
import com.inn.stadium.service.BillService;
import com.inn.stadium.utils.StadiumUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class BillRestImpl implements BillRest {

    @Autowired
    BillService billService;

    @Override
    public ResponseEntity<String> generateReport(Map<String, Object> requestMap) {
        try {
            return billService.generateReport(requestMap);

        }catch (Exception e){
            e.printStackTrace();
        }

        return StadiumUtils.getResponseEntity(StadiumConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<Bill>> getBills() {
        try {
            return billService.getBills();

        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public ResponseEntity<byte[]> getPdf(Map<String, Object> requestMap) {
        try {
            return billService.getPdf(requestMap);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return null;
    }
}


