package com.inn.stadium.restImpl;

import com.inn.stadium.konstantet.StadiumConstants;
import com.inn.stadium.rest.ContactRest;
import com.inn.stadium.service.ContactService;
import com.inn.stadium.utils.StadiumUtils;
import com.inn.stadium.wrapper.ContactWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
public class ContactRestImpl implements ContactRest {

    @Autowired
    ContactService contactService;


    // Metoda për të shtuar një kontakt të ri duke përdorur të dhënat nga një hartë e dhënash.
    @Override
    public ResponseEntity<String> addNewContact(Map<String, String> requestMap) {
        try{
            return contactService.addNewContact(requestMap);
        }catch (Exception e){
            e.printStackTrace();
        }
        // Në rast se ndodh një gabim, kthe një përgjigje me kodin e gabimit të serverit.
        return StadiumUtils.getResponseEntity(StadiumConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // Metoda për të marrë të gjitha kontaktet.
    @Override
    public ResponseEntity<List<ContactWrapper>> getAllContact() {
        try{
            return contactService.getAllContact();
        }catch (Exception e){
            e.printStackTrace();
        }
        // Në rast se ndodh një gabim, kthe një listë e zbrazët dhe një përgjigje me kodin e gabimit të serverit.
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }


    // Metoda për të përditësuar një kontakt ekzistues duke përdorur të dhënat nga një hartë e dhënash.
    @Override
    public ResponseEntity<String> updateContact(Map<String, String> requestMap) {
        try {
            contactService.updateContact(requestMap);

        }catch (Exception e){
            e.printStackTrace();
        }
        return StadiumUtils.getResponseEntity(StadiumConstants.SOMETHING_WENT_WRONG,HttpStatus.INTERNAL_SERVER_ERROR);
    }


    // Metoda për të fshirë një kontakt me një ID të caktuar.
    @Override
    public ResponseEntity<String> deleteContact(Integer id) {
        try {
            contactService.deleteContact(id);

        }catch (Exception e){
            e.printStackTrace();
        }
        return StadiumUtils.getResponseEntity(StadiumConstants.SOMETHING_WENT_WRONG,HttpStatus.INTERNAL_SERVER_ERROR);
    }


    // Metoda për të përditësuar statusin e një kontakti ekzistues duke përdorur të dhënat nga një hartë e dhënash.
    @Override
    public ResponseEntity<String> updateStatus(Map<String, String> requestMap) {
        try {
            return contactService.updateStatus(requestMap);

        }catch (Exception e){
            e.printStackTrace();
        }
        return StadiumUtils.getResponseEntity(StadiumConstants.SOMETHING_WENT_WRONG,HttpStatus.INTERNAL_SERVER_ERROR);
    }


    // Metoda për të marrë një kontakt me një ID të caktuar.
    @Override
    public ResponseEntity<ContactWrapper> getContactById(Integer id) {
        try {
            return contactService.getContactById(id);

        }catch (Exception ex){
            ex.printStackTrace();
        }
        return new ResponseEntity<>(new ContactWrapper(),HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
