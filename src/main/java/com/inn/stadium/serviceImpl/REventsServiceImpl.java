package com.inn.stadium.serviceImpl;

import com.inn.stadium.JWT.JwtFilter;
import com.inn.stadium.POJO.Category;
import com.inn.stadium.POJO.REvents;
import com.inn.stadium.konstantet.StadiumConstants;
import com.inn.stadium.repository.REventsDao;
import com.inn.stadium.service.REventsService;
import com.inn.stadium.utils.StadiumUtils;
import com.inn.stadium.wrapper.REventsWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;


@Service
public class REventsServiceImpl implements REventsService {

    @Autowired
    REventsDao rEventsDao;

    @Autowired
    JwtFilter jwtFilter;



    @Override
    public ResponseEntity<String> addNewEvent(Map<String, String> requestMap) {
        try{
            if(jwtFilter.isAdmin()){
                if (validateEventsMap(requestMap, false)){
                    rEventsDao.save(getEventsFromMap(requestMap, false));
                    return StadiumUtils.getResponseEntity("Eventi u shtua me sukses!", HttpStatus.OK);
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

    private REvents getEventsFromMap(Map<String, String> requestMap, boolean isAdd) {

        Category category = new Category();
        category.setId(Integer.parseInt(requestMap.get("categoryId")));

        REvents rEvents = new REvents();
        if(isAdd){
            rEvents.setId(Integer.parseInt(requestMap.get("id")));
        }else{
            rEvents.setStatus("true");
        }

        rEvents.setCategory(category);
        rEvents.setTitulli(requestMap.get("titulli"));
        rEvents.setData("data");
        rEvents.setLokacioni("lokacioni");
        rEvents.setOra("ora");
        rEvents.setPershkrimi("pershkrimi");

        return rEvents;
    }

    private boolean validateEventsMap(Map<String, String> requestMap, boolean validateId) {
        if (requestMap.containsKey("titulli")){
            if (requestMap.containsKey("id") && validateId){
                return true;
            }else if (!validateId){
                return true;
            }
        }
        return false;
    }

    @Override
    public ResponseEntity<List<REventsWrapper>> getAllEvents() {
        try{
            return new ResponseEntity<>(rEventsDao.getAllEvents(), HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> updateEvents(Map<String, String> requestMap) {
        try{
            if (jwtFilter.isAdmin()){
                if (validateEventsMap(requestMap, true)) {
                    Optional<REvents>optional = rEventsDao.findById(Integer.parseInt(requestMap.get("id")));

                    if(!optional.isEmpty()){
                        REvents rEvents = getEventsFromMap(requestMap,true);
                        rEvents.setStatus(optional.get().getStatus());
                        rEventsDao.save(rEvents);
                        return StadiumUtils.getResponseEntity("Eventi u shtua me sukses !", HttpStatus.OK);
                    }else{
                        return StadiumUtils.getResponseEntity("Eventi me kete id nuk ekziston !", HttpStatus.OK);
                    }
                }else{
                    return StadiumUtils.getResponseEntity(StadiumConstants.INVALID_DATA, HttpStatus.BAD_REQUEST);
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
    public ResponseEntity<String> deleteEvent(Integer id) {
        try{
            if (jwtFilter.isAdmin()){
                Optional optional = rEventsDao.findById(id);
                if(!optional.isEmpty()){
                    rEventsDao.deleteById(id);
                    return StadiumUtils.getResponseEntity("Eventi u fshie me sukses !", HttpStatus.OK);
                }
                return StadiumUtils.getResponseEntity("Eventi me kete id nuk ekziston !", HttpStatus.OK);
            }else{
                return StadiumUtils.getResponseEntity(StadiumConstants.UNAUTHORIZED_ACCESS, HttpStatus.UNAUTHORIZED);
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        return StadiumUtils.getResponseEntity(StadiumConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> updateStatus(Map<String, String> requestMap) {
        try{
            if(jwtFilter.isAdmin()){
                Optional optional = rEventsDao.findById(Integer.parseInt(requestMap.get("id")));

                if(!optional.isEmpty()){
                    rEventsDao.updateEventStatus(requestMap.get("status"), Integer.parseInt(requestMap.get("id")));
                    return StadiumUtils.getResponseEntity("Statusi i eventit u ndryshua me sukses !", HttpStatus.OK);
                }
                return StadiumUtils.getResponseEntity("Eventi me kete id nuk ekziston !", HttpStatus.OK);
            }else{
                return StadiumUtils.getResponseEntity(StadiumConstants.UNAUTHORIZED_ACCESS, HttpStatus.UNAUTHORIZED);
            }

        }catch (Exception e){
            e.printStackTrace();
        }
        return StadiumUtils.getResponseEntity(StadiumConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<REventsWrapper>> getByCategory(Integer id) {
        try{
            return new ResponseEntity<>(rEventsDao.getEventsByCategory(id),HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<REventsWrapper> getEventById(Integer id) {
        try {
            return new ResponseEntity<>(rEventsDao.getEventsById(id), HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(new REventsWrapper(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
