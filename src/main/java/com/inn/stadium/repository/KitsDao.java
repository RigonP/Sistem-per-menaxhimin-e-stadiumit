package com.inn.stadium.repository;

import com.inn.stadium.POJO.Kits;
import com.inn.stadium.wrapper.KitsWrapper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;

public interface KitsDao extends JpaRepository<Kits,Integer> {

    List<KitsWrapper> getAllKits();

    @Modifying
    @Transactional
    Integer updateKitsStatus(@Param("status") String status, @Param("id") Integer id);

    List <KitsWrapper> getKitsByProduct(@Param("id") Integer id);

    KitsWrapper getByKitsId(@Param("id") Integer id);
}
