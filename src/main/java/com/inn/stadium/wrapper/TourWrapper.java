package com.inn.stadium.wrapper;


import lombok.Data;


@Data
public class TourWrapper {

    Integer id;
    String emri;
    String mbiemri;
    String statusi;


    public TourWrapper(){

    }

    public TourWrapper(Integer i, String e, String m, String s){
        id = i;
        emri = e;
        mbiemri = m;
        statusi = s;
    }

    public TourWrapper(Integer i, String s){
        id = i;
        statusi = s;
    }
}
