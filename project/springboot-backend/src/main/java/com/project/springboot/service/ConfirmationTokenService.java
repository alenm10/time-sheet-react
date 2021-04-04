package com.project.springboot.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.springboot.model.Category;
import com.project.springboot.model.ConfirmationToken;
import com.project.springboot.repository.ConfirmationTokenRepository;

@Service
public class ConfirmationTokenService {

	@Autowired
	private ConfirmationTokenRepository repository;
	
	public Optional<ConfirmationToken> findById(Long id) {
		return repository.findById(id);
	}
	
	public ConfirmationToken findByEmail(String email) {
		return repository.findByEmailAndIsUsedFalse(email);
	}
	
	public ConfirmationToken findByToken(String token) {
		return repository.findByTokenAndIsUsedFalse(token);
	}
	
	public ConfirmationToken save(ConfirmationToken entity) {
		return repository.save(entity);
	}
}
