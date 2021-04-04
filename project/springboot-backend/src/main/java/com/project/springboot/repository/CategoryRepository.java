package com.project.springboot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.project.springboot.model.Category;
@Repository
public interface CategoryRepository extends JpaRepository<Category, Long>{
	Category findCategoryByName(String name);
	List<Category> findByIsDeletedFalse();
	Page<Category> findByIsDeletedFalse(Pageable pageRequest);
}