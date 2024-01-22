package com.inn.stadium.repository;

import com.inn.stadium.POJO.Tour;
import com.inn.stadium.wrapper.TourWrapper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TourDao extends JpaRepository<Tour, Integer> {

    List<TourWrapper> getAllTour();

    TourWrapper getTourById(@Param("id") Integer id);

}
