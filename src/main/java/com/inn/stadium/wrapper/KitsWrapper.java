package com.inn.stadium.wrapper;

import lombok.Data;


@Data
public class KitsWrapper{

    Integer id;

    String name;

    String description;

    String player;
    Integer price;

    String status;

    Integer productId;

    String productName;



public KitsWrapper(){

}

public KitsWrapper(Integer id, String name, String description, String player, Integer price, String status, Integer productId, String productName){
    this.id=id;
    this.name=name;
    this.description=description;
    this.player=player;
    this.price=price;
    this.status=status;
    this.productId=productId;
    this.productName=productName;
}

public KitsWrapper(Integer id, String name){
    this.id=id;
    this.name=name;
}

public KitsWrapper(Integer id, String name, String description, String player, Integer price){
    this.id=id;
    this.name=name;
    this.description=description;
    this.player=player;
    this.price=price;
    }
}