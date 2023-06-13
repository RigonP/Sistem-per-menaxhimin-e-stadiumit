package com.inn.stadium.serviceImpl;


import com.inn.stadium.JWT.JwtFilter;
import com.inn.stadium.POJO.Category;
import com.inn.stadium.POJO.Events;
import com.inn.stadium.konstantet.StadiumConstants;
import com.inn.stadium.repository.EventsDao;
import com.inn.stadium.service.EventsService;
import com.inn.stadium.utils.StadiumUtils;
import com.inn.stadium.wrapper.EventsWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class EventsServiceImpl implements EventsService {

    @Autowired
    EventsDao eventsDao;

    @Autowired
    JwtFilter jwtFilter;



    @Override
    public ResponseEntity<String> addNewEvent(Map<String, String> requestMap) {
        try {
            if (jwtFilter.isAdmin()) {
                if (validateEventsMap(requestMap, false)) {
                    eventsDao.save(getEventsFromMap(requestMap, false));
                    return StadiumUtils.getResponseEntity("Eventi u shtua me sukses!", HttpStatus.OK);
                }
                return StadiumUtils.getResponseEntity(StadiumConstants.INVALID_DATA, HttpStatus.BAD_REQUEST);

            } else {
                return StadiumUtils.getResponseEntity(StadiumConstants.UNAUTHORIZED_ACCESS, HttpStatus.UNAUTHORIZED);
            }

        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return StadiumUtils.getResponseEntity(StadiumConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private boolean validateEventsMap(Map<String, String> requestMap, boolean validateId) {

        if (requestMap.containsKey("titulli")) {
            if (requestMap.containsKey("id") && validateId) {
                return true;
            } else if (!validateId) {
                return true;
            }
        }
        return false;
    }

    private Events getEventsFromMap(Map<String, String> requestMap, boolean isAdd) {

        Category category = new Category();
        category.setId(Integer.parseInt(requestMap.get("categoryId")));


        Events events = new Events();
        if (isAdd) {
            events.setId(Integer.parseInt(requestMap.get("id")));
        } else {
            events.setStatus("true");
        }

        events.setCategory(category);
        events.setTitulli(requestMap.get("titulli"));
        events.setDescription(requestMap.get("description"));
        events.setEventType(requestMap.get("eventType"));
        events.setLocation(requestMap.get("location"));
        events.setDate(requestMap.get("date"));
        return events;

    }

    @Override
    public ResponseEntity<List<EventsWrapper>> getAllEvents() {

        try {
            return new ResponseEntity<>(eventsDao.getAllEvents(), HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> updateEvent(Map<String, String> requestMap) {
        try {
            if (jwtFilter.isAdmin()) {
                if (validateEventsMap(requestMap, true)) {
                    Optional<Events> optional = eventsDao.findById(Integer.parseInt(requestMap.get("id")));
                    if (!optional.isEmpty()) {
                        Events events = getEventsFromMap(requestMap,true);
                        events.setStatus(optional.get().getStatus());
                        eventsDao.save(events);
                        return StadiumUtils.getResponseEntity("Eventi u ndryshua me sukses!", HttpStatus.OK);
                    } else {
                        return StadiumUtils.getResponseEntity("Event Id nuk ekziston!", HttpStatus.OK);
                    }
                } else {
                    return StadiumUtils.getResponseEntity(StadiumConstants.INVALID_DATA, HttpStatus.BAD_REQUEST);
                }

            } else {
                return StadiumUtils.getResponseEntity(StadiumConstants.UNAUTHORIZED_ACCESS, HttpStatus.UNAUTHORIZED);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return StadiumUtils.getResponseEntity(StadiumConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> deleteEvent(Integer id) {
        try {
            if (jwtFilter.isAdmin()) {
                Optional optional = eventsDao.findById(id);
                if (!optional.isEmpty()){
                    eventsDao.deleteById(id);
                    return StadiumUtils.getResponseEntity("Eventi u fshie me sukses!",HttpStatus.OK);
                }
                return StadiumUtils.getResponseEntity("Eventi nuk ekziston!",HttpStatus.OK);
            } else {
                return  StadiumUtils.getResponseEntity(StadiumConstants.UNAUTHORIZED_ACCESS, HttpStatus.UNAUTHORIZED);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return StadiumUtils.getResponseEntity(StadiumConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> updateStatus(Map<String, String> requestMap) {

        try {
            if(jwtFilter.isAdmin()){
                Optional optional =eventsDao.findById(Integer.parseInt(requestMap.get("id")));
                if(!optional.isEmpty()){
                    eventsDao.updateEventStatus(requestMap.get("status"),Integer.parseInt(requestMap.get("id")));
                    return StadiumUtils.getResponseEntity("Event status eshte ndryshuar me sukses!",HttpStatus.OK);
                }
                return StadiumUtils.getResponseEntity("Event id nuk ekziston!",HttpStatus.OK);

            }else {
                return StadiumUtils.getResponseEntity(StadiumConstants.UNAUTHORIZED_ACCESS,HttpStatus.UNAUTHORIZED);
            }

        }catch (Exception e){
            e.printStackTrace();
        }

        return StadiumUtils.getResponseEntity(StadiumConstants.SOMETHING_WENT_WRONG,HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<EventsWrapper>> getByCategory(Integer id) {
        try {
            return new ResponseEntity<>(eventsDao.getEventsByCategory(id),HttpStatus.OK);

        }catch (Exception e){
            e.printStackTrace();
        }

        return new ResponseEntity<>(new ArrayList<>(),HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<EventsWrapper> getEventById(Integer id) {
        try {
            return new ResponseEntity<>(eventsDao.getEventsById(id),HttpStatus.OK);

        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(new EventsWrapper(),HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
