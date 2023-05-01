package com.inn.stadium.serviceImpl;

import com.inn.stadium.repository.BillDao;
import com.inn.stadium.repository.CategoryDao;
import com.inn.stadium.repository.ProductDao;
import com.inn.stadium.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class DashboardServiceImpl implements DashboardService {

    @Autowired
    BillDao billDao;

    @Autowired
    CategoryDao categoryDao;

    @Autowired
    ProductDao productDao;

    @Override
    public ResponseEntity<Map<String, Object>> getCount() {
        Map<String,Object> map = new HashMap<>();
        map.put("category",categoryDao.count());
        map.put("product",productDao.count());
        map.put("bill",billDao.count());
        return new ResponseEntity<>(map, HttpStatus.OK);
    }
}
