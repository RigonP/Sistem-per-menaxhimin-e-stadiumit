package com.inn.stadium.serviceImpl;

import com.google.common.base.Strings;
import com.inn.stadium.JWT.JwtFilter;
import com.inn.stadium.POJO.Category;
import com.inn.stadium.konstantet.StadiumConstants;
import com.inn.stadium.repository.CategoryDao;
import com.inn.stadium.service.CategoryService;
import com.inn.stadium.utils.StadiumUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Slf4j
@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    CategoryDao categoryDao;

    @Autowired
    JwtFilter jwtFilter;

    @Override
    public ResponseEntity<String> addNewCategory(Map<String, String> requestMap) {
        try{
            if(jwtFilter.isAdmin()){
                if(valdateCategoryMap(requestMap,false)){
                    categoryDao.save(getCategoryFromMap(requestMap,false));
                    return StadiumUtils.getResponseEntity("Category added Successfully",HttpStatus.OK);
                }

            }else {
                return  StadiumUtils.getResponseEntity(StadiumConstants.UNAUTHORIZED_ACCESS,HttpStatus.UNAUTHORIZED);
            }

        }catch (Exception e){
            e.printStackTrace();
        }
        return StadiumUtils.getResponseEntity(StadiumConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }


    private boolean valdateCategoryMap(Map<String, String> requestMap, boolean validateId) {

        if(requestMap.containsKey("name")){
            if(requestMap.containsKey("id") && validateId){
                return  true;
            }else if(!validateId){
                return true;
            }
        }
        return  false;
    }

    private Category getCategoryFromMap(Map <String,String> requestMap, Boolean isAdd){
        Category category = new Category();
        if(isAdd){
            category.setId(Integer.parseInt(requestMap.get("id")));

        }
        category.setName(requestMap.get("name"));
        return  category;
    }

    @Override
    public ResponseEntity<List<Category>> getAllCategory(String filterValue) {
        try{

            if(!Strings.isNullOrEmpty(filterValue) && filterValue.equalsIgnoreCase("true")){
                log.info("inside if");
                return new ResponseEntity<List<Category>>(categoryDao.getAllCategory(),HttpStatus.OK);
            }
            return  new ResponseEntity<>(categoryDao.findAll(),HttpStatus.OK);

        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<List<Category>>(new ArrayList<>(),HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> updateCategory(Map<String, String> requestMap) {
        try{
            if(jwtFilter.isAdmin()){
                if(valdateCategoryMap(requestMap,true)){
                   Optional optional = categoryDao.findById(Integer.parseInt(requestMap.get("id")));
                    if(!optional.isEmpty()){
                        categoryDao.save(getCategoryFromMap(requestMap,true));
                        return StadiumUtils.getResponseEntity("Category Updated Successfully" , HttpStatus.OK);
                    }else{
                        return StadiumUtils.getResponseEntity("Category id doesn't exist",HttpStatus.OK);
                    }
                }
                return  StadiumUtils.getResponseEntity(StadiumConstants.INVALID_DATA,HttpStatus.BAD_REQUEST);

            }else{
                return StadiumUtils.getResponseEntity(StadiumConstants.UNAUTHORIZED_ACCESS,HttpStatus.UNAUTHORIZED);
            }

        }catch (Exception e){
            e.printStackTrace();
        }
        return StadiumUtils.getResponseEntity(StadiumConstants.SOMETHING_WENT_WRONG,HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
