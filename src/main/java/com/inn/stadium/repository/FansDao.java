package com.inn.stadium.repository;

import com.inn.stadium.POJO.Fans;
import com.inn.stadium.wrapper.FansWrapper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FansDao extends JpaRepository<Fans, Integer> {

    List<FansWrapper> getAllFans();

    List<FansWrapper> getFansByCategory(@Param("id") Integer id);

    FansWrapper getFansById(@Param("id") Integer id);
}
