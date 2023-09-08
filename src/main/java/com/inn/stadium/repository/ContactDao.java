package com.inn.stadium.repository;

import com.inn.stadium.POJO.Contact;
import com.inn.stadium.wrapper.ContactWrapper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;

public interface ContactDao extends JpaRepository<Contact, Integer> {

    // Metoda për të marrë të gjitha kontaktet në një listë të objekteve ContactWrapper.
    List<ContactWrapper>getAllContact();

    // Metoda për të përditësuar statusin e një kontakti me anë të një ID-je të caktuar.
    @Transactional
    @Modifying
    Integer updateContactStatus(@Param("status") String status, @Param("id") Integer id);

    // Metoda për të marrë një kontakt duke përdorur një ID të caktuar dhe kthyer si objekt ContactWrapper.
    ContactWrapper getContactById(@Param("id") Integer id);


}
