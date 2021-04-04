package com.project.springboot.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.project.springboot.exception.ResourceExistsException;
import com.project.springboot.exception.ResourceNotFoundException;
import com.project.springboot.model.Client;
import com.project.springboot.repository.ClientRepository;

@Service
public class ClientService implements IService<Client>{

	@Autowired
	private ClientRepository repository;
	
	@Override
	public List<Client> findAll() {
		return repository.findByIsDeletedFalse();
	}

	public Page<Client> findAll(Pageable pageable) {
		return repository.findByIsDeletedFalse(pageable);
	}
	
	public Page<Client> findByClientName(String clientName, Pageable pageable) {
		return repository.findByIsDeletedFalseAndClientNameContaining(clientName, pageable);
	}
	
	public Page<Client> findByClientNameStartsWith(String letter, Pageable pageable) {
		return repository.findByIsDeletedFalseAndClientNameStartsWith(letter, pageable);
	}
	
	@Override
	public Optional<Client> findById(Long id) {
		return repository.findById(id);
	}

	@Override
	public Client save(Client entity) throws Exception {
		if(repository.findClientByClientName(entity.getClientName()) != null) {
			throw new ResourceExistsException("client name already exist");
		}
		return repository.save(entity);
	}

	@Override
	public Client update(Client entity, Long id) throws Exception {
		Client oldEntity = repository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Client with id :" + id + " doesn't exist"));
		
		if(!oldEntity.getClientName().equalsIgnoreCase(entity.getClientName())
				&& repository.findClientByClientName(entity.getClientName()) != null) {
			throw new ResourceExistsException("name already exist");
		}

		oldEntity.setClientName(entity.getClientName());
		oldEntity.setCity(entity.getCity());
		oldEntity.setCountry(entity.getCountry());
		oldEntity.setAddress(entity.getAddress());
		oldEntity.setPostalCode(entity.getPostalCode());
		return repository.save(oldEntity);
	}

	@Override
	public void delete(Long id) throws Exception {
		Client client = repository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Client with id :" + id + " doesn't exist"));
		
		client.setDeleted(true);
		repository.save(client);
	}

	
}
