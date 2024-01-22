package com.inn.stadium.repository;

import com.inn.stadium.POJO.ACategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface ACategoryDao extends JpaRepository<ACategory, Integer> {
    List<ACategory> getAllACategory();
}
