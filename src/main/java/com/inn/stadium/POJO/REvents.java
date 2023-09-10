package com.inn.stadium.POJO;



import lombok.Data;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.io.Serial;
import java.io.Serializable;


@Data
@Entity
@DynamicUpdate
@DynamicInsert
@Table(name = "eventsR")
public class REvents implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_fk" , nullable = false)
    private Category category;

    @Column(name = "titulli")
    private String titulli;

    @Column(name = "lokacioni")
    private String lokacioni;

    @Column(name = "data")
    private String data;

    @Column(name = "ora")
    private String ora;

    @Column(name = "pershkrimi")
    private String pershkrimi;

    @Column(name = "status")
    private String status;

}
