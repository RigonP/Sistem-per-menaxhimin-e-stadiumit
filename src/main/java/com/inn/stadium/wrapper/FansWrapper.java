package com.inn.stadium.wrapper;


import lombok.Data;

@Data
public class FansWrapper {

    Integer id;
    String emri;
    String mbiemri;
    String email;
    Integer fansCategoryId;
    String fansCategoryEmri;

    public FansWrapper(){

    }

    public FansWrapper(Integer i, String e, String m, String em, Integer fCId, String fCN){
        id = i;
        emri = e;
        mbiemri = m;
        email = em;
        fansCategoryId = fCId;
        fansCategoryEmri = fCN;
    }

    public FansWrapper(Integer i,String e){
        id = i;
        emri = e;
    }

    public FansWrapper(Integer i,String e, String m){
        id = i;
        emri = e;
        mbiemri = m;
    }
}
