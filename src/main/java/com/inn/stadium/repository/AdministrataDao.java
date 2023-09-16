package com.inn.stadium.repository;

import com.inn.stadium.POJO.Administrata;
import com.inn.stadium.wrapper.AdministrataWrapper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AdministrataDao extends JpaRepository<Administrata, Integer> {

    List<AdministrataWrapper> getAllAdministrata();

    AdministrataWrapper getAdministrataById(@Param("id") Integer id);

}
