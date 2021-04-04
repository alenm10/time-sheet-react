package com.project.springboot.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.springboot.model.Client;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long>{
	Client findClientByClientName(String clientName);
	List<Client> findByIsDeletedFalse();
	Page<Client> findByIsDeletedFalse(Pageable pageRequest);
	Page<Client> findByIsDeletedFalseAndClientNameContaining(String clientName, Pageable pageRequest); 
	Page<Client> findByIsDeletedFalseAndClientNameStartsWith(String letter, Pageable pageRequest);
}
