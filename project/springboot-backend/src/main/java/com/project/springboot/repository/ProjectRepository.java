package com.project.springboot.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.springboot.model.Client;
import com.project.springboot.model.Project;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long>{
	Project findProjectByProjectName(String projectName);
	List<Project> findByIsDeletedFalse();
	Page<Project> findByIsDeletedFalse(Pageable pageRequest);
	Page<Project> findByIsDeletedFalseAndProjectNameContaining(String projectName, Pageable pageRequest); 
	Page<Project> findByIsDeletedFalseAndProjectNameStartsWith(String letter, Pageable pageRequest);
}
