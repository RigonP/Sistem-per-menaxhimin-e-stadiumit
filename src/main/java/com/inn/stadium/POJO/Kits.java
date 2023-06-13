package com.inn.stadium.POJO;


import lombok.Data;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.io.Serializable;

@NamedQuery(
        name = "Kits.getAllKits",
        query = "select new com.inn.stadium.wrapper.KitsWrapper(k.id, k.name, k.description, k.player, k.price, k.status, k.product.id, k.product.name) from Kits k"
)

@NamedQuery(
        name = "Kits.updateKitsStatus",
        query = "UPDATE Kits k SET k.status = :status WHERE k.id = :id"
)

@NamedQuery(
        name = "Kits.getKitsByProduct",
        query = "SELECT new com.inn.stadium.wrapper.KitsWrapper(k.id, k.name) FROM Kits k WHERE k.product.id = :id AND k.status = 'true'"
)

@NamedQuery(
        name = "Kits.getByKitsId",
        query = "SELECT new com.inn.stadium.wrapper.KitsWrapper(k.id, k.name, k.description, k.price) FROM Kits k WHERE k.id = :id"
)

@Data
@Entity
@DynamicInsert
@DynamicUpdate
@Table(name="kits")

public class Kits implements Serializable{

    public static final long serialVersionUID = 123456L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Integer id;

    @Column(name="name")
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="product_fk" , nullable = false)
    private Product product;

    @Column(name = "description")
    private String description;

    @Column(name = "player")
    private String player;

    @Column(name = "price")
    private Integer price;

    @Column(name = "status")
    private String status;

}