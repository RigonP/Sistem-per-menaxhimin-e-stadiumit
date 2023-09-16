package com.inn.stadium.serviceImpl;

import com.inn.stadium.JWT.JwtFilter;
import com.inn.stadium.POJO.Administrata;
import com.inn.stadium.POJO.Contact;
import com.inn.stadium.konstantet.StadiumConstants;
import com.inn.stadium.repository.AdministrataDao;
import com.inn.stadium.service.AdministrataService;
import com.inn.stadium.utils.StadiumUtils;
import com.inn.stadium.wrapper.AdministrataWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class AdministrataServiceImpl implements AdministrataService {

    @Autowired
    AdministrataDao administrataDao;

    @Autowired
    JwtFilter jwtFilter;



    @Override
    public ResponseEntity<String> addNewAdministrata(Map<String, String> requestMap) {
        try{
            if(jwtFilter.isAdministrationAdmin() || jwtFilter.isAdmin()){
                if(validateAdminstrataMap(requestMap, false)){
                    administrataDao.save(getAdministrataFromMap(requestMap, false));
                }
                return StadiumUtils.getResponseEntity(StadiumConstants.INVALID_DATA, HttpStatus.BAD_REQUEST);
            }else {
                return StadiumUtils.getResponseEntity(StadiumConstants.UNAUTHORIZED_ACCESS, HttpStatus.UNAUTHORIZED);
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        return StadiumUtils.getResponseEntity(StadiumConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private boolean validateAdminstrataMap(Map<String, String> requestMap, boolean validateId) {
        if (requestMap.containsKey("telefoni")){
            if (requestMap.containsKey("id")){
                return true;
            }else if(!validateId){
                return true;
            }
        }

        return false;
    }

    private Administrata getAdministrataFromMap(Map<String, String> requestMap, boolean isAdd) {
        Administrata administrata = new Administrata();
        if (isAdd) {
            administrata.setId(Integer.parseInt(requestMap.get("id")));
        }

        administrata.setTelefoni(requestMap.get("telefoni"));
        administrata.setEmail(requestMap.get("email"));
        administrata.setFax(requestMap.get("fax"));
        return administrata;
    }

    @Override
    public ResponseEntity<List<AdministrataWrapper>> getAllAdministrata() {
        try{
            return new ResponseEntity<>(administrataDao.getAllAdministrata(), HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> updateAdministrata(Map<String, String> requestMap) {
        try{
            if(jwtFilter.isAdministrationAdmin() || jwtFilter.isAdmin()){
                if(validateAdminstrataMap(requestMap, true)){
                    Optional<Administrata> optional = administrataDao.findById(Integer.parseInt(requestMap.get("id")));

                    if(!optional.isEmpty()){
                        Administrata administrata = getAdministrataFromMap(requestMap, true);
                        administrataDao.save(administrata);
                        return StadiumUtils.getResponseEntity("Administrata u shtua me sukses !", HttpStatus.OK);
                    }else{
                        return StadiumUtils.getResponseEntity("Administrata me kete ID nuk ekziston!", HttpStatus.OK);
                    }
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
    public ResponseEntity<String> deleteAdministrata(Integer id) {
        try{
            if(jwtFilter.isAdministrationAdmin() || jwtFilter.isAdmin()){
                Optional optional = administrataDao.findById(id);
                if(!optional.isEmpty()){
                    administrataDao.deleteById(id);
                    return StadiumUtils.getResponseEntity("Administrata u fshie me sukses !", HttpStatus.OK);
                }
                return StadiumUtils.getResponseEntity("Administrata me kete id nuk ekziston !", HttpStatus.OK);
            }else{
                return StadiumUtils.getResponseEntity(StadiumConstants.UNAUTHORIZED_ACCESS, HttpStatus.UNAUTHORIZED);
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        return StadiumUtils.getResponseEntity(StadiumConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<AdministrataWrapper> getAdministrataById(Integer id) {
        try{
            return new ResponseEntity<>(administrataDao.getAdministrataById(id), HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(new AdministrataWrapper(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
