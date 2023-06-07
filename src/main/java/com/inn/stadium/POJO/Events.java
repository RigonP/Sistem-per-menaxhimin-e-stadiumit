package com.inn.stadium.POJO;


import lombok.Data;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.io.Serializable;
@NamedQuery(name = "Events.getAllEvents",query = "select new com.inn.stadium.wrapper.EventsWrapper(e.id,e.titulli,e.date,e.location,e.eventType,e.category.id,e.category.name,e.description) from Events e")

@NamedQuery(name = "Events.updateEventStatus",query = "update Events e set e.status=:status where e.id=:id")

@NamedQuery(name = "Events.getEventByCategory",query = "select new com.inn.stadium.wrapper.EventsWrapper(e.id,e.titulli) from Events e where e.category.id=:id and e.status='true'")

@NamedQuery(name = "Events.getEventById",query ="select new com.inn.stadium.wrapper.EventsWrapper(p.id,p.titulli,p.description,p.eventType) from Events p where p.id=:id" )



@Data
@Entity
@DynamicUpdate
@DynamicInsert
@Table(name = "events")
public class Events implements Serializable {

    private static final long serialVersionUID=1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="category_fk" , nullable = false)
    private Category category;

    @Column(name = "titulli")
    private String titulli;

    @Column(name = "date")
    private String date;

    @Column(name = "location")
    private String location;

    @Column(name = "eventType")
    private String eventType;

    @Column(name="description")
    private String description;

    @Column(name="status")
    private String status;

}
