package com.inn.stadium.wrapper;

import lombok.Data;

@Data
public class REventsWrapper {

    Integer id;
    String titulli;
    String lokacioni;
    String data;
    String ora;
    String pershkrimi;
    String statusi;
    String categoryName;
    Integer categoryId;

    public REventsWrapper(){

    }

    public REventsWrapper(Integer i, String t, String l, String d,String o, String p, String s, String cN, Integer cId){
        id = i;
        titulli = t;
        lokacioni = l;
        data = d;
        ora = o;
        pershkrimi = p;
        statusi = s;
        categoryName = cN;
        categoryId = cId;
    }

    public REventsWrapper(Integer i, String t){
        id = i;
        titulli = t;
    }

    public REventsWrapper(Integer i, String t, String l, String d, String o, String p){
        id = i;
        titulli = t;
        lokacioni = l;
        data = d;
        ora = o;
        pershkrimi = p;
    }
}
