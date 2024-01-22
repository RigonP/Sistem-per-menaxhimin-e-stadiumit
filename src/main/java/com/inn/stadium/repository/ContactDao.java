package com.inn.stadium.repository;

import com.inn.stadium.POJO.Contact;
import com.inn.stadium.wrapper.ContactWrapper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;

public interface ContactDao extends JpaRepository<Contact, Integer> {

    List<ContactWrapper>getAllContact();

    @Transactional
    @Modifying
    Integer updateContactStatus(@Param("status") String status, @Param("id") Integer id);

    ContactWrapper getContactById(@Param("id") Integer id);


}
