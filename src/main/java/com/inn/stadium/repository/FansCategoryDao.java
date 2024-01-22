package com.inn.stadium.repository;

import com.inn.stadium.POJO.FansCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FansCategoryDao extends JpaRepository<FansCategory, Integer> {
    List<FansCategory> getAllFansCategory();
}
