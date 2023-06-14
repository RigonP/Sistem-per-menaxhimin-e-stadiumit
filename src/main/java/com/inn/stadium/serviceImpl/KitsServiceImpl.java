package com.inn.stadium.serviceImpl;

import com.inn.stadium.JWT.JwtFilter;
import com.inn.stadium.POJO.Kits;
import com.inn.stadium.POJO.Product;
import com.inn.stadium.konstantet.StadiumConstants;
import com.inn.stadium.repository.KitsDao;
import com.inn.stadium.service.KitsService;
import com.inn.stadium.utils.StadiumUtils;
import com.inn.stadium.wrapper.KitsWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class KitsServiceImpl implements KitsService {

    @Autowired
    KitsDao kitsDao;

    @Autowired
    JwtFilter jwtFilter;

    @Override
    public ResponseEntity<String> addNewKits(Map<String, String> requestMap) {
        try {
            if(jwtFilter.isAdmin()){
                if(validateKitsMap(requestMap, false)){
                    kitsDao.save(getKitsFromMap(requestMap, false));
                    return StadiumUtils.getResponseEntity("Kits u shtua me sukses", HttpStatus.OK);
                }
            }else {
                return StadiumUtils.getResponseEntity(StadiumConstants.UNAUTHORIZED_ACCESS, HttpStatus.UNAUTHORIZED);
            }
        }catch(Exception e){
            e.printStackTrace();
        }
        return StadiumUtils.getResponseEntity(StadiumConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<KitsWrapper>> getAllKits() {
        try {
            return new ResponseEntity<>(kitsDao.getAllKits(), HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> updateKits(Map<String, String> requestMap) {
        try {
            if(jwtFilter.isAdmin()){
                if(validateKitsMap(requestMap, true)){
                    Optional<Kits> optional = kitsDao.findById(Integer.parseInt(requestMap.get("id")));
                    if(!optional.isEmpty()){
                        Kits kits = getKitsFromMap(requestMap, true);
                        kits.setStatus(optional.get().getStatus());
                        kitsDao.save(kits);
                        return StadiumUtils.getResponseEntity("Kits u ndryshua me sukses (update)" , HttpStatus.OK);
                    }else{
                        return StadiumUtils.getResponseEntity("Kits nuk ekziston" , HttpStatus.OK);
                    }
                }else {
                    return StadiumUtils.getResponseEntity(StadiumConstants.INVALID_DATA, HttpStatus.OK);
                }
            }else{
                return StadiumUtils.getResponseEntity(StadiumConstants.UNAUTHORIZED_ACCESS, HttpStatus.UNAUTHORIZED);
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        return StadiumUtils.getResponseEntity(StadiumConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> deleteKits(Integer id) {
        try {
            if(jwtFilter.isAdmin()){
                Optional optional = kitsDao.findById(id);
                if(!optional.isEmpty()){
                    kitsDao.deleteById(id);
                    return StadiumUtils.getResponseEntity("Kits u fshi me sukses" , HttpStatus.OK);
                }else {
                    return StadiumUtils.getResponseEntity("Kits ID nuk ekziston" , HttpStatus.OK);
                }
            }else{
                return StadiumUtils.getResponseEntity(StadiumConstants.UNAUTHORIZED_ACCESS, HttpStatus.UNAUTHORIZED);
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        return StadiumUtils.getResponseEntity(StadiumConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> updateStatus(Map<String, String> requestMap) {
        try {
            if(jwtFilter.isAdmin()){
                Optional optional = kitsDao.findById(Integer.parseInt(requestMap.get("id")));
                if(!optional.isEmpty()){
                    kitsDao.updateKitsStatus(requestMap.get("status"), Integer.parseInt(requestMap.get("id")));
                    return StadiumUtils.getResponseEntity("Kits status eshte bere update", HttpStatus.OK);
                }else{
                    return StadiumUtils.getResponseEntity("Kits Id nuk ekziston" , HttpStatus.OK);
                }
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        return StadiumUtils.getResponseEntity(StadiumConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<KitsWrapper>> getByProduct(Integer id) {
        try {
            return new ResponseEntity<>(kitsDao.getKitsByProduct(id), HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<KitsWrapper> getByKitsId(Integer id) {
        try {
            return new ResponseEntity<>(kitsDao.getByKitsId(id), HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(new KitsWrapper(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private Kits getKitsFromMap(Map<String, String> requestMap, boolean isAdd) {
        Product product = new Product();

        product.setId(Integer.parseInt(requestMap.get("productId")));
        Kits kits = new Kits();
        if(isAdd){
            kits.setId(Integer.parseInt(requestMap.get("id")));
        }else{
            kits.setStatus("true");
        }

        kits.setProduct(product);

        kits.setName(requestMap.get("name"));

        kits.setPrice(Integer.parseInt(requestMap.get("price")));

        kits.setDescription(requestMap.get("description"));

        kits.setPlayer(requestMap.get("player"));

        return kits;
    }

    private boolean validateKitsMap(Map<String, String> requestMap, boolean b) {
        if(requestMap.containsKey("player")){
            if(requestMap.containsKey("id") && b){
                return true;
            } else if (!b) {
                return true;
            }
        }
        return false;
        }
    }

