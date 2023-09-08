package com.inn.stadium.serviceImpl;

import com.inn.stadium.JWT.JwtFilter;
import com.inn.stadium.POJO.Contact;
import com.inn.stadium.konstantet.StadiumConstants;
import com.inn.stadium.repository.ContactDao;
import com.inn.stadium.service.ContactService;
import com.inn.stadium.utils.StadiumUtils;
import com.inn.stadium.wrapper.ContactWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class ContactServiceImpl implements ContactService {

    @Autowired
    ContactDao contactDao;

    @Autowired
    JwtFilter jwtFilter;

    @Override
    public ResponseEntity<String> addNewContact(Map<String, String> requestMap) {
        try {
            if (jwtFilter.isAdmin()) {
                if (validateContactMap(requestMap, false)) {
                    contactDao.save(getContactFromMap(requestMap, false));
                    return StadiumUtils.getResponseEntity("Kontakti u shtua me sukses!", HttpStatus.OK);
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

    private Contact getContactFromMap(Map<String, String> requestMap, boolean isAdd) {
        Contact contact = new Contact();
        if (isAdd) {
            contact.setId(Integer.parseInt(requestMap.get("id")));
        } else {
            contact.setStatus("true");
        }

        contact.setEmail(requestMap.get("email"));
        contact.setEmri(requestMap.get("emri"));
        contact.setMbiemri(requestMap.get("mbiemri"));
        contact.setMesazhi(requestMap.get("mesazhi"));
        contact.setNumriTel(requestMap.get("numriTel"));
        return contact;
    }

    private boolean validateContactMap(Map<String, String> requestMap, boolean validateId) {
        if (requestMap.containsKey("emri")) {
            if (requestMap.containsKey("id") && validateId) {
                return true;
            } else if (!validateId) {
                return true;
            }
        }
        return false;
    }

    @Override
    public ResponseEntity<List<ContactWrapper>> getAllContact() {
        try {
            return new ResponseEntity<>(contactDao.getAllContact(), HttpStatus.OK);
        }catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> updateContact(Map<String, String> requestMap) {
        try {
            if (jwtFilter.isAdmin()) {
                if (validateContactMap(requestMap, true)) {
                    Optional<Contact> optional = contactDao.findById(Integer.parseInt(requestMap.get("id")));
                    if (!optional.isEmpty()) {
                        Contact contact = getContactFromMap(requestMap,true);
                        contact.setStatus(optional.get().getStatus());
                        contactDao.save(contact);
                        return StadiumUtils.getResponseEntity("Kontakti u ndryshua me sukses!", HttpStatus.OK);
                    }else {
                        return StadiumUtils.getResponseEntity("Kontakt Id nuk ekziston!", HttpStatus.OK);
                    }
                }else {
                    return StadiumUtils.getResponseEntity(StadiumConstants.INVALID_DATA, HttpStatus.BAD_REQUEST);
                }
            }else {
                return StadiumUtils.getResponseEntity(StadiumConstants.UNAUTHORIZED_ACCESS, HttpStatus.UNAUTHORIZED);
            }
        }catch (Exception e) {
            e.printStackTrace();
        }
        return StadiumUtils.getResponseEntity(StadiumConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> deleteContact(Integer id) {
        try {
            if (jwtFilter.isAdmin()) {
                Optional optional = contactDao.findById(id);
                if (!optional.isEmpty()){
                    contactDao.deleteById(id);
                    return StadiumUtils.getResponseEntity("Kontakti u fshie me sukses!",HttpStatus.OK);
                }
                return StadiumUtils.getResponseEntity("Kontakti nuk ekziston!",HttpStatus.OK);
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
            if(jwtFilter.isAdmin()){
                Optional optional =contactDao.findById(Integer.parseInt(requestMap.get("id")));
                if(!optional.isEmpty()){
                    contactDao.updateContactStatus(requestMap.get("status"),Integer.parseInt(requestMap.get("id")));
                    return StadiumUtils.getResponseEntity("Contact status eshte ndryshuar me sukses!",HttpStatus.OK);
                }
                return StadiumUtils.getResponseEntity("Contact id nuk ekziston!",HttpStatus.OK);
            }else {
                return StadiumUtils.getResponseEntity(StadiumConstants.UNAUTHORIZED_ACCESS,HttpStatus.UNAUTHORIZED);
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        return StadiumUtils.getResponseEntity(StadiumConstants.SOMETHING_WENT_WRONG,HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<ContactWrapper> getContactById(Integer id) {
        try {
            return new ResponseEntity<>(contactDao.getContactById(id),HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ContactWrapper(),HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
