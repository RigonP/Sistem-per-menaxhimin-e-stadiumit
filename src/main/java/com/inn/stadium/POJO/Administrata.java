package com.inn.stadium.POJO;

import lombok.Data;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.io.Serial;
import java.io.Serializable;


@NamedQuery(name = "Administrata.getAllAdministrata",query = "select new com.inn.stadium.wrapper.AdministrataWrapper(c.id,c.telefoni,c.fax,c.email) from Administrata c")
@NamedQuery(name = "Administrata.getAdministrataById",query ="select new com.inn.stadium.wrapper.AdministrataWrapper(c.id,c.email) from Administrata c where c.id=:id" )



@Data
@Entity
@DynamicUpdate
@DynamicInsert
@Table(name = "administrata")
public class Administrata implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "telefoni")
    private String telefoni;

    @Column(name = "fax")
    private String fax;

    @Column(name = "email")
    private String email;
}
