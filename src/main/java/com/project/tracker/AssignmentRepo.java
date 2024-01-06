package com.project.tracker;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import jakarta.transaction.Transactional;

@Repository
public interface AssignmentRepo extends JpaRepository<Assignment, Integer> {

    @Query(value = "SELECT * FROM assignment A WHERE A.user_id = :value",
    		nativeQuery = true)
    List<Assignment> findByUser(@Param("value") java.math.BigInteger value);
    
    @Transactional
    @Modifying
    @Query(value = "DELETE FROM assignment A WHERE A.user_id = :value",
    		nativeQuery = true)
    void deleteByUser(@Param("value") java.math.BigInteger value);
}
