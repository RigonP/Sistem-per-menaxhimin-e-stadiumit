package com.inn.stadium.wrapper;


import lombok.Data;

@Data
public class AdministrataWrapper {

    Integer id;
    String telefoni;
    String fax;
    String email;



    public AdministrataWrapper(){

    }

    public AdministrataWrapper(Integer i, String t, String f, String e){
        id = i;
        telefoni = t;
        fax = f;
        email = e;
    }

    public AdministrataWrapper(Integer i, String m){
        id = i;
        email = m;
    }
}
