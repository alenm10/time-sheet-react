package com.project.springboot.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.project.springboot.dto.TeamMemberDto;
import com.project.springboot.dto.UpdatePasswordDto;
import com.project.springboot.exception.PasswordMismatchException;
import com.project.springboot.exception.ResourceExistsException;
import com.project.springboot.exception.ResourceNotFoundException;
import com.project.springboot.exception.UsernameMismatchException;
import com.project.springboot.model.Client;
import com.project.springboot.model.TeamMember;
import com.project.springboot.repository.TeamMemberRepository;

@Service
public class TeamMemberService implements IService<TeamMember>{

	@Autowired
	TeamMemberRepository repository;

	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Override
	public List<TeamMember> findAll() {
		return repository.findByIsDeletedFalse();
	}

	public Page<TeamMember> findAll(Pageable pageable) {
		return repository.findByIsDeletedFalse(pageable);
	}
	
	public List<TeamMember> findAvailalbe(){
		return repository.findByIsDeletedFalseAndLeadingProjectIsNull();
	}
	
	@Override
	public Optional<TeamMember> findById(Long id) {
		return repository.findById(id);
	}

	public TeamMember findTeamMemberByUsername(String username) {
		return repository.findTeamMemberByUsername(username);
	}
	
	public TeamMember findTeamMemberByEmail(String email) {
		return repository.findTeamMemberByEmail(email);
	}
	
	@Override
	public TeamMember save(TeamMember entity) throws Exception {
		System.out.println("service save = " + entity);
		if(repository.findTeamMemberByEmail(entity.getEmail()) != null) {
			throw new ResourceExistsException("email already exist");
		}
		if(repository.findTeamMemberByUsername(entity.getUsername()) != null) {
			throw new ResourceExistsException("username already exist");
		}
		return repository.save(entity);
	}
	
	@Override
	public TeamMember update(TeamMember newEntity, Long id) throws Exception {
		TeamMember oldEntity = repository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("TeamMember with id :" + id + " doesn't exist"));
		
		if(!oldEntity.getEmail().equalsIgnoreCase(newEntity.getEmail()) &&
				repository.findTeamMemberByEmail(newEntity.getEmail()) != null) {
			throw new ResourceExistsException("email already exist");
		}
		if(!oldEntity.getUsername().equalsIgnoreCase(newEntity.getUsername()) &&
				repository.findTeamMemberByUsername(newEntity.getUsername()) != null) {
			throw new ResourceExistsException("username already exist");
		}
		
		oldEntity.setName(newEntity.getName());
		oldEntity.setEmail(newEntity.getEmail());
		oldEntity.setHoursPerWeek(newEntity.getHoursPerWeek());
		oldEntity.setUsername(newEntity.getUsername());
		oldEntity.setStatus(newEntity.getStatus());
		oldEntity.setRoles(newEntity.getRoles());
		return repository.save(oldEntity);
	}

	@Override
	public void delete(Long id) throws Exception {
		TeamMember entity = repository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("TeamMember with id :" + id + " doesn't exist"));
		entity.setDeleted(true);
		repository.save(entity);
	}

	public void resetPassword(Long id) throws Exception {
		TeamMember entity = repository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("TeamMember with id :" + id + " doesn't exist"));
		entity.setUpdatePassword(true);
		repository.save(entity);	
	}
	
	public TeamMember updatePassword(long id, UpdatePasswordDto dto) {
		TeamMember entity = repository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("TeamMember with id :" + id + " doesn't exist"));
		if(!entity.getUsername().contentEquals(dto.getUsername())) {
			throw new UsernameMismatchException("Usernames do not match");
		}
		
		String currentPassword = entity.getPassword();
		System.out.println("currentPassword = " + currentPassword);
		String currentPasswordDto = dto.getOldPassword();
		System.out.println("currentPasswordDto = " + currentPasswordDto);

		if(!passwordEncoder.matches(currentPasswordDto, currentPassword)) {
			System.out.println("passwords dont match");
			throw new PasswordMismatchException("Passwords do not match");
		}
		entity.setPassword(passwordEncoder.encode(dto.getNewPassword()));
		System.out.println("new password = " + dto.getNewPassword() + " " + passwordEncoder.encode(dto.getNewPassword()));
		return repository.save(entity);
	}

	public TeamMember updateProfile(TeamMember oldEntity, TeamMemberDto newEntity)  throws Exception {
		if(oldEntity == null) {
			new ResourceNotFoundException("TeamMember doesn't exist");			
		}
		if(!oldEntity.getEmail().equalsIgnoreCase(newEntity.getEmail()) &&
				repository.findTeamMemberByEmail(newEntity.getEmail()) != null) {
			throw new ResourceExistsException("email already exist");
		}
		if(!oldEntity.getUsername().equalsIgnoreCase(newEntity.getUsername()) &&
				repository.findTeamMemberByUsername(newEntity.getUsername()) != null) {
			throw new ResourceExistsException("username already exist");
		}
		oldEntity.setName(newEntity.getName());
		oldEntity.setEmail(newEntity.getEmail());
		oldEntity.setHoursPerWeek(newEntity.getHoursPerWeek());
		oldEntity.setUsername(newEntity.getUsername());
		oldEntity.setStatus(newEntity.getStatus());
		return repository.save(oldEntity);
	}
	
	public TeamMember resetForgotPassword(String email, String newPassword) {
		TeamMember e = repository.findTeamMemberByEmail(email);
		e.setPassword(passwordEncoder.encode(newPassword));
		return repository.save(e);
	}
}
