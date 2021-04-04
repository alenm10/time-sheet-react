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
import com.project.springboot.model.Project;
import com.project.springboot.model.TeamMember;
import com.project.springboot.repository.ProjectRepository;
import com.project.springboot.repository.TeamMemberRepository;

@Service
public class ProjectService implements IService<Project>{

	@Autowired
	private ProjectRepository repository;
	
	@Autowired
	private TeamMemberRepository teamMemberRepository;
	
	@Override
	public List<Project> findAll() {
		return repository.findByIsDeletedFalse();
	}

	public Page<Project> findAll(Pageable pageable) {
		return repository.findByIsDeletedFalse(pageable);
	}
	
	public Page<Project> findByProjectName(String projectName, Pageable pageable) {
		return repository.findByIsDeletedFalseAndProjectNameContaining(projectName, pageable);
	}
	
	public Page<Project> findByProjectNameStartsWith(String letter, Pageable pageable) {
		return repository.findByIsDeletedFalseAndProjectNameStartsWith(letter, pageable);
	}

	@Override
	public Optional<Project> findById(Long id) {
		return repository.findById(id);
	}

	@Override
	public Project save(Project entity) throws Exception {
		if(repository.findProjectByProjectName(entity.getProjectName()) != null) {
			throw new ResourceExistsException("project name already exist");
		}
		
		Project p = repository.save(entity);
		TeamMember projectLead = p.getProjectLead();
		projectLead.setLeadingProject(p);
		teamMemberRepository.save(projectLead);
		return p;
	}

	@Override
	public Project update(Project entity, Long id) throws Exception {
		Project oldEntity = repository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Project with id :" + id + " doesn't exist"));
		
		if(!oldEntity.getProjectName().equalsIgnoreCase(entity.getProjectName())
				&& repository.findProjectByProjectName(entity.getProjectName()) != null) {
			throw new ResourceExistsException("name already exist");
		}

		boolean shouldUpdateLead = false;
		if(oldEntity.getProjectLead().getId() != entity.getProjectLead().getId()) {
			//project lead changed
			TeamMember oldProjectLead = oldEntity.getProjectLead();
			oldProjectLead.setLeadingProject(null);
			teamMemberRepository.save(oldProjectLead);
			shouldUpdateLead = true;
			System.out.println("shouldupdatelead = true");
		}
		
		oldEntity.setProjectName(entity.getProjectName());
		oldEntity.setDescription(entity.getDescription());
		oldEntity.setStatus(entity.getStatus());
		oldEntity.setArchive(entity.isArchive());
		oldEntity.setClient(entity.getClient());
		oldEntity.setProjectLead(entity.getProjectLead());
		//return repository.save(oldEntity);
		
		Project p = repository.save(oldEntity);
		
		if(shouldUpdateLead) {
			TeamMember projectLead = p.getProjectLead();
			projectLead.setLeadingProject(p);
			teamMemberRepository.save(projectLead);			
		}
		return p;
	}

	@Override
	public void delete(Long id) throws Exception {
		Project entity = repository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Project with id :" + id + " doesn't exist"));
		
		entity.setDeleted(true);
		repository.save(entity);
		//repository.deleteById(id);
		
		// remove project reference from project lead
		TeamMember projectLead = entity.getProjectLead();
		System.out.println("found project lead = " + projectLead.getName());
		projectLead.setLeadingProject(null);
		teamMemberRepository.save(projectLead);			
	}

}
