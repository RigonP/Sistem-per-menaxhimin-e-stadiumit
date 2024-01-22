package com.inn.stadium.serviceImpl;

import com.inn.stadium.JWT.JwtFilter;
import com.inn.stadium.POJO.Tour;
import com.inn.stadium.konstantet.StadiumConstants;
import com.inn.stadium.repository.TourDao;
import com.inn.stadium.service.TourService;
import com.inn.stadium.utils.StadiumUtils;
import com.inn.stadium.wrapper.TourWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;


@Service
public class TourServiceImpl implements TourService {

    @Autowired
    TourDao tourDao;

    @Autowired
    JwtFilter jwtFilter;


    @Override
    public ResponseEntity<String> addNewTour(Map<String, String> requestMap) {
        try{
            if(jwtFilter.isAdmin()){
                if(validateTourMap(requestMap, false)){
                    tourDao.save(getTourFromMap(requestMap, false));
                    return StadiumUtils.getResponseEntity("Tour u shtua me sukses !", HttpStatus.OK);
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

    private boolean validateTourMap(Map<String, String> requestMap, boolean validateId) {
        if (requestMap.containsKey("emri")){
            if (requestMap.containsKey("id")){
                return true;
            }else if(!validateId){
                return true;
            }
        }
        return false;
    }

    private Tour getTourFromMap(Map<String, String> requestMap, boolean isAdd) {
        Tour tour = new Tour();
        if(isAdd){
            tour.setId(Integer.parseInt(requestMap.get("id")));
        }
        tour.setEmri(requestMap.get("emri"));
        tour.setMbiemri(requestMap.get("mbiemri"));
        tour.setStatusi(requestMap.get("statusi"));
        return tour;
    }

    @Override
    public ResponseEntity<List<TourWrapper>> getAllTour() {
        try{
            return new ResponseEntity<>(tourDao.getAllTour(), HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> updateTour(Map<String, String> requestMap) {
        try{
            if(jwtFilter.isAdmin()){
                if(validateTourMap(requestMap, true)){
                    Optional<Tour> optional = tourDao.findById(Integer.parseInt(requestMap.get("id")));

                    if(!optional.isEmpty()){
                        Tour tour = getTourFromMap(requestMap, true);
                        tourDao.save(tour);
                        return StadiumUtils.getResponseEntity("Tour u shtua me sukses !", HttpStatus.OK);
                    }else{
                        return StadiumUtils.getResponseEntity("Tour me kete ID nuk ekziston!", HttpStatus.OK);
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
    public ResponseEntity<String> deleteTour(Integer id) {
        try{
            if(jwtFilter.isAdmin()){
                Optional optional = tourDao.findById(id);
                if(!optional.isEmpty()){
                    tourDao.deleteById(id);
                    return StadiumUtils.getResponseEntity("Tour u fshie me sukses !", HttpStatus.OK);
                }
                return StadiumUtils.getResponseEntity("Tour me kete id nuk ekziston !", HttpStatus.OK);
            }else{
                return StadiumUtils.getResponseEntity(StadiumConstants.UNAUTHORIZED_ACCESS, HttpStatus.UNAUTHORIZED);
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        return StadiumUtils.getResponseEntity(StadiumConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<TourWrapper> getById(Integer id) {
        try{
            return new ResponseEntity<>(tourDao.getTourById(id), HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(new TourWrapper(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
