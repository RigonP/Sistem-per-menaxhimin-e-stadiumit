package com.inn.stadium.POJO;


import lombok.Data;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.io.Serial;
import java.io.Serializable;

@NamedQuery(
        name = "Tour.getAllTour",
        query = "select new com.inn.stadium.wrapper.TourWrapper(c.id,c.emri,c.mbiemri,c.statusi) from Tour c"
)

@NamedQuery(
        name = "Tour.getTourById",
        query ="select new com.inn.stadium.wrapper.TourWrapper(c.id,c.statusi) from Tour c where c.id=:id"
)


@Data
@Entity
@DynamicInsert
@DynamicUpdate
@Table(name = "tour")
public class Tour implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "emri")
    private String emri;

    @Column(name = "mbiemri")
    private String mbiemri;

    @Column(name = "statusi")
    private String statusi;
}
