package com.inn.stadium.repository;

import com.inn.stadium.POJO.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface CategoryDao extends JpaRepository<Category,Integer> {
    List<Category> getAllCategory();
}

