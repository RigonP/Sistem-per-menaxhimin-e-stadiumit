package com.inn.stadium.repository;

import com.inn.stadium.POJO.REvents;
import com.inn.stadium.wrapper.REventsWrapper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;


public interface REventsDao  extends JpaRepository<REvents,Integer> {

    List<REventsWrapper> getAllEvents();
    @Modifying
    @Transactional
    Integer updateEventStatus(@Param("status") String status, @Param("id") Integer id);

    List<REventsWrapper>getEventsByCategory(@Param("id") Integer id);

    REventsWrapper getEventsById(@Param("id") Integer id);

}
