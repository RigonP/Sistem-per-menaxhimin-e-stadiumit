package com.inn.stadium.wrapper;


import lombok.Data;

@Data
public class ContactWrapper {

    Integer id;
    String emri;
    String mbiemri;
    String email;
    String numriTel;
    String mesazhi;
    String status;

    public ContactWrapper() {

    }

    public ContactWrapper(Integer id, String emri, String mbiemri, String email, String numriTel,String mesazhi, String status) {
        this.id = id;
        this.emri = emri;
        this.mbiemri = mbiemri;
        this.email = email;
        this.numriTel = numriTel;
        this.mesazhi = mesazhi;
        this.status = status;
    }
}
