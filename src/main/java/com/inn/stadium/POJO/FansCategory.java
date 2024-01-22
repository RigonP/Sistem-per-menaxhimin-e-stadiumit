package com.inn.stadium.POJO;


import lombok.Data;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.io.Serial;
import java.io.Serializable;

@NamedQuery(
        name = "FansCategory.getAllFansCategory",
        query = "select t from FansCategory t where t.id in (select p.fansCategory from Fans p)"
)



@Data
@Entity
@DynamicUpdate
@DynamicInsert
@Table(name = "fansCategory")
public class FansCategory implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    public Integer id;

    @Column(name = "emri")
    public String emri;
}
