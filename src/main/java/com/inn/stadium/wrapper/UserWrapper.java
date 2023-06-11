package com.inn.stadium.wrapper;


import lombok.Data;

@Data
public class UserWrapper {


    private Integer id;

    private String name;

    private String email;

    private String contactNumber;

    private String  status;

    public UserWrapper(){

    }
    public UserWrapper(Integer id, String name, String email, String contactNumber, String status) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.contactNumber = contactNumber;
        this.status = status;
    }
    public UserWrapper(Integer id, String name, String email, String contactNumber) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.contactNumber = contactNumber;
    }


}
