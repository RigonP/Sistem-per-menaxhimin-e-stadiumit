package com.inn.stadium.POJO;


import lombok.Data;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.io.Serial;

@Data
@Entity
@DynamicInsert
@DynamicUpdate
@Table(name="fans")
public class Fans {

    @Serial
    private static final long serialVersionUID= 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    public Integer id;

    @Column(name = "name")
    public String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fansCategory_fk", nullable = false)
    private FansCategory fansCategory;

    @Column(name = "lastname")
    private String lastname;

}
