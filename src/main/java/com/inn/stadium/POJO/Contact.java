package com.inn.stadium.POJO;


import lombok.Data;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.io.Serializable;

@NamedQuery(name = "Contact.getAllContact",query = "select new com.inn.stadium.wrapper.ContactWrapper(c.id,c.emri,c.mbiemri,c.email,c.numriTel,c.mesazhi,c.status) from Contact c")
@NamedQuery(name = "Contact.updateContactStatus",query = "update Contact c set c.status=:status where c.id=:id")
@NamedQuery(name = "Contact.getContactById",query ="select new com.inn.stadium.wrapper.ContactWrapper(c.id,c.emri,c.mbiemri,c.email) from Contact c where c.id=:id" )


@Data
@Entity
@DynamicUpdate
@DynamicInsert
@Table(name = "contact")
public class Contact implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "emri")
    private String emri;

    @Column(name = "mbiemri")
    private String mbiemri;

    @Column(name = "email")
    private String email;

    @Column(name = "numriTel")
    private String numriTel;

    @Column(name = "mesazhi")
    private String mesazhi;

    @Column(name = "status")
    private String status;

}
