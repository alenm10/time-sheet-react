package com.project.springboot.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.project.springboot.exception.ResourceExistsException;
import com.project.springboot.exception.ResourceNotFoundException;
import com.project.springboot.model.Category;
import com.project.springboot.repository.CategoryRepository;

@Service
public class CategoryService implements IService<Category>{

	@Autowired
	private CategoryRepository repository;
	
	@Override
	public List<Category> findAll() {
		return repository.findByIsDeletedFalse();
	}
	
	public Page<Category> findAll(Pageable pageable) {
		return repository.findByIsDeletedFalse(pageable);
	}

	@Override
	public Optional<Category> findById(Long id) {
		return repository.findById(id);
	}

	@Override
	public Category save(Category entity) throws Exception {
		if(repository.findCategoryByName(entity.getName()) != null) {
			throw new ResourceExistsException("name already exist");
		}
		entity.setDeleted(false);
		return repository.save(entity);
	}

	@Override
	public Category update(Category entity, Long id) throws Exception {
		Category oldEntity = repository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Category with id :" + id + " doesn't exist"));
		
		if(repository.findCategoryByName(entity.getName()) != null) {
			throw new ResourceExistsException("name already exist");
		}
		
		oldEntity.setName(entity.getName());
		return repository.save(oldEntity);
	}

	@Override
	public void delete(Long id) throws Exception {
		Category category = repository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Category with id :" + id + " doesn't exist"));
		category.setDeleted(true);
		repository.save(category);
	}

}
