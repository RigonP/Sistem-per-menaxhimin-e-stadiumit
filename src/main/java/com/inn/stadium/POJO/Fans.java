package com.inn.stadium.POJO;


import lombok.Data;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.io.Serial;
import java.io.Serializable;


@NamedQuery(
        name = "Fans.getAllFans",
        query = "select new com.inn.stadium.wrapper.FansWrapper(p.id,p.emri,p.mbiemri, p.email, p.fansCategory.id,p.fansCategory.emri) from Fans p")

@NamedQuery(
        name = "Fans.getFansByCategory",
        query = "select new com.inn.stadium.wrapper.FansWrapper(p.id,p.emri) from Fans p where p.fansCategory.id=:id ")

@NamedQuery(
        name = "Fans.getProfesoriById",
        query ="select new com.inn.stadium.wrapper.FansWrapper(p.id,p.emri,p.mbiemri) from Fans p where p.id=:id" )

@Data
@Entity
@DynamicInsert
@DynamicUpdate
@Table(name="fans")
public class Fans implements Serializable {

    @Serial
    private static final long serialVersionUID= 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    public Integer id;

    @Column(name = "emri")
    public String emri;

    @Column(name = "mbiemri")
    public String mbiemri;

    @Column(name = "email")
    public String email;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fansCategory_fk", nullable = false)
    private FansCategory fansCategory;

}
