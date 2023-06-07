package com.inn.stadium.repository;

import com.inn.stadium.POJO.Events;
import com.inn.stadium.wrapper.EventsWrapper;
import com.inn.stadium.wrapper.ProductWrapper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;


public interface EventsDao  extends JpaRepository<Events,Integer> {

    List<EventsWrapper> getAllEvents();

    @Modifying
    @Transactional
    Integer updateEventStatus(@Param("status") String status, @Param("id") Integer id);


    List<EventsWrapper>getEventsByCategory(@Param("id") Integer id);

    EventsWrapper getEventsById(@Param("id") Integer id);





}
