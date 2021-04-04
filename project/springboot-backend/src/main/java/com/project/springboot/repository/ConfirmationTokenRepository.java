package com.project.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.springboot.model.ConfirmationToken;

@Repository
public interface ConfirmationTokenRepository extends JpaRepository<ConfirmationToken, Long>{
	ConfirmationToken findByEmailAndIsUsedFalse(String email);
	ConfirmationToken findByTokenAndIsUsedFalse(String token);
}