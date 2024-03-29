package com.inn.stadium.serviceImpl;

import com.inn.stadium.JWT.JwtFilter;
import com.inn.stadium.POJO.Category;
import com.inn.stadium.POJO.Product;
import com.inn.stadium.konstantet.StadiumConstants;
import com.inn.stadium.repository.ProductDao;
import com.inn.stadium.service.ProductService;
import com.inn.stadium.utils.StadiumUtils;
import com.inn.stadium.wrapper.ProductWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;


@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    ProductDao productDao;

    @Autowired
    JwtFilter jwtFilter;


    @Override
    public ResponseEntity<String> addNewProduct(Map<String, String> requestMap) {
        try {
            if (jwtFilter.isAdmin() || jwtFilter.isProductAdmin()) {
                if (validateProductMap(requestMap, false)) {
                    productDao.save(getProductFromMap(requestMap, false));
                    return StadiumUtils.getResponseEntity("Produkti u shtua me sukses!", HttpStatus.OK);
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


    private boolean validateProductMap(Map<String, String> requestMap, boolean validateId) {

        if (requestMap.containsKey("name")) {
            if (requestMap.containsKey("id") && validateId) {
                return true;
            } else if (!validateId) {
                return true;
            }
        }
        return false;
    }

    private Product getProductFromMap(Map<String, String> requestMap, boolean isAdd) {

        Category category = new Category();
        category.setId(Integer.parseInt(requestMap.get("categoryId")));


        Product product = new Product();
        if (isAdd) {
            product.setId(Integer.parseInt(requestMap.get("id")));
        } else {
            product.setStatus("true");
        }

        product.setCategory(category);
        product.setName(requestMap.get("name"));
        product.setDescription(requestMap.get("description"));
        product.setPrice(Integer.parseInt(requestMap.get("price")));
        return product;

    }

    @Override
    public ResponseEntity<List<ProductWrapper>> getAllProduct() {

        try {
            return new ResponseEntity<>(productDao.getAllProduct(), HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> updateProduct(Map<String, String> requestMap) {
        try {
            if (jwtFilter.isAdmin() || jwtFilter.isProductAdmin()) {
                if (validateProductMap(requestMap, true)) {
                    Optional<Product> optional = productDao.findById(Integer.parseInt(requestMap.get("id")));
                    if (!optional.isEmpty()) {
                        Product product = getProductFromMap(requestMap, true);
                        product.setStatus(optional.get().getStatus());
                        productDao.save(product);
                        return StadiumUtils.getResponseEntity("Produkti u ndryshua me sukses!", HttpStatus.OK);
                    } else {
                        return StadiumUtils.getResponseEntity("Product Id nuk ekziston!", HttpStatus.OK);
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
    public ResponseEntity<String> deleteProduct(Integer id) {

        try {
            if (jwtFilter.isAdmin() || jwtFilter.isProductAdmin()) {
                Optional optional = productDao.findById(id);
                if (!optional.isEmpty()){
                    productDao.deleteById(id);
                    return StadiumUtils.getResponseEntity("Produkti u fshie me sukses!",HttpStatus.OK);
                }
                return StadiumUtils.getResponseEntity("Product id nuk ekziston!",HttpStatus.OK);
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
            if(jwtFilter.isAdmin() || jwtFilter.isProductAdmin()){
                Optional optional =productDao.findById(Integer.parseInt(requestMap.get("id")));
                if(!optional.isEmpty()){
                    productDao.updateProductStatus(requestMap.get("status"),Integer.parseInt(requestMap.get("id")));
                    return StadiumUtils.getResponseEntity("Product status eshte ndryshuar me sukses!",HttpStatus.OK);
                }
                return StadiumUtils.getResponseEntity("Product id nuk ekziston!",HttpStatus.OK);

            }else {
                return StadiumUtils.getResponseEntity(StadiumConstants.UNAUTHORIZED_ACCESS,HttpStatus.UNAUTHORIZED);
            }

        }catch (Exception e){
            e.printStackTrace();
        }

        return StadiumUtils.getResponseEntity(StadiumConstants.SOMETHING_WENT_WRONG,HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<ProductWrapper>> getByCategory(Integer id) {

        try {
            return new ResponseEntity<>(productDao.getProductByCategory(id),HttpStatus.OK);

        }catch (Exception e){
            e.printStackTrace();
        }

        return new ResponseEntity<>(new ArrayList<>(),HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<ProductWrapper> getProductById(Integer id) {
        try {
            return new ResponseEntity<>(productDao.getProductById(id),HttpStatus.OK);

        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ProductWrapper(),HttpStatus.INTERNAL_SERVER_ERROR);
    }


}
