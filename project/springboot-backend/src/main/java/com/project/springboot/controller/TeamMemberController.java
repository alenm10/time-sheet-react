package com.project.springboot.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.springboot.dto.ClientSelectOption;
import com.project.springboot.dto.ProjectDto;
import com.project.springboot.dto.TeamMemberDto;
import com.project.springboot.dto.TeamMemberSelectOption;
import com.project.springboot.dto.UpdatePasswordDto;
import com.project.springboot.exception.ResourceNotFoundException;
import com.project.springboot.mapper.TeamMemberMapper;
import com.project.springboot.model.Client;
import com.project.springboot.model.Project;
import com.project.springboot.model.TeamMember;
import com.project.springboot.service.TeamMemberService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/team-members")
public class TeamMemberController {

	@Autowired
	private TeamMemberService service;
	
	@Autowired
	private TeamMemberMapper mapper;
	
	/*
	 * http://localhost:8080/team-members
	 * */
	@GetMapping()
	@PreAuthorize("hasAuthority('ADMIN')")
	public List<TeamMember> getAll() {
		return service.findAll();
	}		
	
	@GetMapping(path = "/logged-user")
	public ResponseEntity<TeamMember> getLoggedUser() {
		Authentication data = SecurityContextHolder.getContext().getAuthentication();
		//System.out.println("name = " + data.getName());
		TeamMember entity = service.findTeamMemberByUsername(data.getName());
		if(entity != null) {
			return new ResponseEntity<>(entity, HttpStatus.OK);			
		}else {
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);				
		}
	}
	
	@GetMapping(path = "/page/{pageNum}")
	@PreAuthorize("hasAuthority('ADMIN')")
	public ResponseEntity<Page<TeamMemberDto>> getAllByPage(@PathVariable int pageNum) {
		Pageable pageRequest = PageRequest.of(pageNum - 1, 5);
    
		Page<TeamMember> page = service.findAll(pageRequest);
		List<TeamMemberDto> dtos = new ArrayList<>();
		for(TeamMember p : page.toList()) {
			dtos.add(mapper.toDto(p));
		}
		Page<TeamMemberDto> pageDtos = new PageImpl<>(dtos, page.getPageable(),
				page.getTotalElements());
		return new ResponseEntity<>(pageDtos, HttpStatus.OK);
	}
	
	@GetMapping("/select-option")
	public List<TeamMemberSelectOption> getAllSelectOption(){
		List<TeamMemberSelectOption> teamMembers = new ArrayList<>();
		for(TeamMember c : service.findAll()) {
			teamMembers.add(new TeamMemberSelectOption(c.getId(), c.getName()));
		}
		System.out.println(teamMembers);
		return teamMembers;
	}
	
	@GetMapping("/available")
	@PreAuthorize("hasAuthority('ADMIN')")
	public List<TeamMemberSelectOption> getAvailableTeamMembers(){
		List<TeamMemberSelectOption> teamMembers = new ArrayList<>();
		for(TeamMember c : service.findAvailalbe()) {
			teamMembers.add(new TeamMemberSelectOption(c.getId(), c.getName()));
		}
		System.out.println(teamMembers);
		return teamMembers;
	}
	
	/* 
	 * {
		    "name": "myname",
			"username": "myusername",
			"email": "myemail@gmail.com",
			"hoursPerWeek": 25,
		    "status": 1,
		    "role": {
		        "id": 2
		    }
		}
	 * */
	@PostMapping()
	@PreAuthorize("hasAuthority('ADMIN')")
	public ResponseEntity<TeamMember> create(@RequestBody TeamMemberDto dto) {
		System.out.println("create = " + dto);
		try {
			return new ResponseEntity<>(service.save(mapper.toEntity(dto)), HttpStatus.CREATED);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}
	
	/*
	 * http://localhost:8080/team-members/1
	 * */
	@GetMapping("/{id}")
	@PreAuthorize("hasAuthority('ADMIN')")
	public ResponseEntity<TeamMember> getById(@PathVariable Long id) {
		TeamMember entity = service.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("TeamMember with id :" + id + " doesn't exist"));
		return ResponseEntity.ok(entity);
	}
		
	/* http://localhost:8080/team-members/2
	 * {
		    "name": "mynamechanged",
			"username": "myusernamechanged",
			"email": "myemailchanged@gmail.com",
			"hoursPerWeek": 40,
		    "status": 1,
		    "role": {
		        "id": 1
		    }
		}
	 * */
	@PutMapping("/{id}")
	@PreAuthorize("hasAuthority('ADMIN')")
	public ResponseEntity<TeamMember> update(@PathVariable Long id,
											 @RequestBody TeamMemberDto newEntityDto){
		TeamMember entity = mapper.toEntity(newEntityDto);
		try {
			return ResponseEntity.ok(service.update(entity, id));
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@PutMapping("/update-profile")
	public ResponseEntity<TeamMember> updateProfile(@RequestBody TeamMemberDto newEntityDto){
		System.out.println("update profile = " + newEntityDto);
		Authentication data = SecurityContextHolder.getContext().getAuthentication();
		TeamMember entity = service.findTeamMemberByUsername(data.getName());		
		try {
			return ResponseEntity.ok(service.updateProfile(entity, newEntityDto));
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@PutMapping("/password")
	public ResponseEntity<TeamMember> updatePassword(@RequestBody UpdatePasswordDto dto) {
		System.out.println("update password = " + dto);
		Authentication data = SecurityContextHolder.getContext().getAuthentication();
		//System.out.println("name = " + data.getName());
		TeamMember entity = service.findTeamMemberByUsername(data.getName());
		try {
			return new ResponseEntity<>(service.updatePassword(entity.getId(), dto), HttpStatus.CREATED);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}
	
	@GetMapping(path = "/reset-password/{id}")
	public ResponseEntity<String> resetPassword(@PathVariable Long id) {
		try {
			service.resetPassword(id);
			return new ResponseEntity<>("OK", HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>("", HttpStatus.BAD_REQUEST);
		}
	}
	
	/*
	 * http://localhost:8080/team-members/2
	 * */
	@DeleteMapping(value = "/{id}")
	@PreAuthorize("hasAuthority('ADMIN')")
	public ResponseEntity<String> delete(@PathVariable Long id) {
		
		try {
			service.delete(id);
			return new ResponseEntity<>("OK", HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
	
}
