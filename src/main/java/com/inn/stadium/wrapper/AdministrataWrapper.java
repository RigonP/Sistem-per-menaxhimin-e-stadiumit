package com.inn.stadium.wrapper;


import lombok.Data;

@Data
public class AdministrataWrapper {

    Integer id;
    String telefoni;
    String fax;
    String email;

    Integer acategoryId;
    String acategoryName;


    public AdministrataWrapper(){

    }

    public AdministrataWrapper(Integer i, String t, String f, String e, Integer aId, String aN){
        id = i;
        telefoni = t;
        fax = f;
        email = e;
        acategoryId = aId;
        acategoryName = aN;
    }

    public AdministrataWrapper(Integer i, String m){
        id = i;
        email = m;
    }
}
