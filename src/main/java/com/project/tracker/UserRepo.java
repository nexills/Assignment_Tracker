package com.project.tracker;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import jakarta.transaction.Transactional;

@Repository
public interface UserRepo extends JpaRepository<User, String> {

    @Query(value = "SELECT * FROM user U WHERE U.email = :email",
    		nativeQuery = true)
    User findByEmail(@Param("email") String email);

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM user U WHERE U.email = :email",
    		nativeQuery = true)
    void deleteByEmail(@Param("email") String email);
}

