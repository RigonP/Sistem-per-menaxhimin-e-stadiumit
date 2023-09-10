package com.inn.stadium.POJO;



import lombok.Data;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.io.Serial;
import java.io.Serializable;


@NamedQuery(
        name = "REvents.getAllEvents",
        query = "select new com.inn.stadium.wrapper.REventsWrapper(e.id, e.titulli, e.lokacioni, e.data, e.ora, e.pershkrimi, e.status, e.category.name, e.category.id) from REvents e"
)

@NamedQuery(
        name = "REvents.updateEventStatus",
        query = "update REvents e set e.status = :status where e.id = :id")

@NamedQuery(
        name = "REvents.getEventsByCategory",
        query = "select new com.inn.stadium.wrapper.REventsWrapper(e.id, e.titulli) from REvents e where e.category.id = :id and e.status = 'true'")

@NamedQuery(
        name = "REvents.getEventById",
        query = "select new com.inn.stadium.wrapper.REventsWrapper(e.id, e.titulli, e.lokacioni, e.data, e.ora, e.pershkrimi) from REvents e where e.id = :id"
)

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
