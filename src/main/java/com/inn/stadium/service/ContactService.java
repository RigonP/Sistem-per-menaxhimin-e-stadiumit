package com.inn.stadium.service;

import com.inn.stadium.wrapper.ContactWrapper;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

//Manipulimi me databaze
public interface ContactService {
    ResponseEntity<String> addNewContact(Map<String, String> requestMap);

    ResponseEntity<List<ContactWrapper>> getAllContact();

    ResponseEntity<String> updateContact(Map<String, String> requestMap);

    ResponseEntity <String> deleteContact(Integer id);
    ResponseEntity<String> updateStatus(Map<String, String> requestMap);

    ResponseEntity<ContactWrapper> getContactById(Integer id);
}
