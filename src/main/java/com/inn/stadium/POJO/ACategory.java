package com.inn.stadium.POJO;

import lombok.Data;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.io.Serial;
import java.io.Serializable;

@NamedQuery(
        name = "ACategory.getAllACategory",
        query = "select t from ACategory t where t.id in (select p.acategory from Administrata p)"
)



@Data
@Entity
@DynamicInsert
@DynamicUpdate
@Table(name = "acategory")
public class ACategory implements Serializable {


    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "name")
    private String name;
}
