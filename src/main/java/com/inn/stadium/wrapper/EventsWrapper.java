package com.inn.stadium.wrapper;


import lombok.Data;

@Data

public class EventsWrapper {

    Integer id;

    String titulli;

    String date;

    String location;

    String eventType;

    Integer categoryId;

    String categoryName;

    String description;

    public EventsWrapper(){

    }

    public EventsWrapper(Integer id, String titulli, String date, String location, String eventType, Integer categoryId, String categoryName, String description) {
        this.id = id;
        this.titulli = titulli;
        this.date = date;
        this.location = location;
        this.eventType = eventType;
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.description = description;

    }
    public EventsWrapper(Integer id,String  titulli){

        this.id=id;
        this.titulli=titulli;
    }

    public EventsWrapper(Integer id,String titulli, String description , String eventType){
        this.id=id;
        this.titulli=titulli;
        this.description=description;
        this.eventType=eventType;
    }

}
