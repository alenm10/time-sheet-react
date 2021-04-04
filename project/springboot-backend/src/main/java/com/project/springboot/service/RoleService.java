package com.project.springboot.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.springboot.exception.ResourceNotFoundException;
import com.project.springboot.model.Role;
import com.project.springboot.repository.RoleRepository;

@Service
public class RoleService implements IService<Role>{

	@Autowired
	private RoleRepository repository;
	
	@Override
	public List<Role> findAll() {
		return repository.findAll();
	}

	@Override
	public Optional<Role> findById(Long id) {
		return repository.findById(id);
	}

	@Override
	public Role save(Role entity) throws Exception {
		return repository.save(entity);
	}

	@Override
	public Role update(Role entity, Long id) throws Exception {
		Role oldEntity = repository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Role with id :" + id + " doesn't exist"));
		oldEntity.setName(entity.getName());
		return repository.save(oldEntity);
	}

	@Override
	public void delete(Long id) {
		repository.deleteById(id);
	}

}
