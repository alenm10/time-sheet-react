package com.project.springboot.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
import com.project.springboot.dto.ProjectItemDto;
import com.project.springboot.exception.ResourceNotFoundException;
import com.project.springboot.mapper.ProjectMapper;
import com.project.springboot.model.Client;
import com.project.springboot.model.Project;
import com.project.springboot.model.Status;
import com.project.springboot.service.ProjectService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/projects")
public class ProjectController {

	@Autowired
	private ProjectService service;
	
	@Autowired
	private ProjectMapper mapper;
	
	/*
	 * http://localhost:8080/projects
	 * */
	@GetMapping()
	@PreAuthorize("hasAuthority('ADMIN')")
	public List<ProjectDto> getAll(){
		List<ProjectDto> dtos = new ArrayList<>();
		for(Project p : service.findAll()) {
			dtos.add(mapper.toDto(p));
		}
		return dtos;
	}		
	
	/*
	 * http://localhost:8080/projects/page/1
	 * */
	@GetMapping(path = "/page/{pageNum}")
	@PreAuthorize("hasAuthority('ADMIN')")
	public ResponseEntity<Page<ProjectDto>> getAllByPage(@PathVariable int pageNum) {
		Pageable pageRequest = PageRequest.of(pageNum - 1, 5);
    
		Page<Project> page = service.findAll(pageRequest);
		List<ProjectDto> dtos = new ArrayList<>();
		for(Project p : page.toList()) {
			dtos.add(mapper.toDto(p));
		}
		
		Page<ProjectDto> pageDtos = new PageImpl<>(dtos, page.getPageable(),
				page.getTotalElements());
		
		return new ResponseEntity<>(pageDtos, HttpStatus.OK);
	}
	
	/*
	 * http://localhost:8080/projects/search/somename
	 * */
	@GetMapping(path = "/search/{name}/{pageNum}")
	@PreAuthorize("hasAuthority('ADMIN')")
	public ResponseEntity<Page<ProjectDto>> searchByName(@PathVariable String name,
														 @PathVariable int pageNum) {
		Pageable pageRequest = PageRequest.of(pageNum - 1, 5);
	    
		Page<Project> page = service.findByProjectName(name, pageRequest);
		List<ProjectDto> dtos = new ArrayList<>();
		for(Project p : page.toList()) {
			dtos.add(mapper.toDto(p));
		}
		
		Page<ProjectDto> pageDtos = new PageImpl<>(dtos, page.getPageable(),
				page.getTotalElements());
		
		return new ResponseEntity<>(pageDtos, HttpStatus.OK);
		
		/*List<Project> projects = service.findByProjectName(name);
		
		if(projects.size() == 0) {
			return new ResponseEntity<>(new ArrayList<>(), HttpStatus.NOT_FOUND);
		}
		
		List<ProjectDto> dtos = new ArrayList<>();
		for(Project p : projects) {
			dtos.add(mapper.toDto(p));
		}
		
		return new ResponseEntity<>(dtos, HttpStatus.OK);*/
	}
	
	/*
	 * http://localhost:8080/projects/filter/A
	 * */
	@GetMapping(path = "/filter/{letter}/{pageNum}")
	@PreAuthorize("hasAuthority('ADMIN')")
	public ResponseEntity<Page<ProjectDto>> filter(@PathVariable String letter,
												   @PathVariable int pageNum) {
		Pageable pageRequest = PageRequest.of(pageNum - 1, 5);
	    
		Page<Project> page = service.findByProjectNameStartsWith(letter, pageRequest);
		List<ProjectDto> dtos = new ArrayList<>();
		for(Project p : page.toList()) {
			dtos.add(mapper.toDto(p));
		}
		
		Page<ProjectDto> pageDtos = new PageImpl<>(dtos, page.getPageable(),
				page.getTotalElements());
		
		return new ResponseEntity<>(pageDtos, HttpStatus.OK);
		
		/*List<Project> projects = service.findByProjectNameStartsWith(letter);
		
		if(projects.size() == 0) {
			return new ResponseEntity<>(new ArrayList<>(), HttpStatus.NOT_FOUND);
		}
		
		List<ProjectDto> dtos = new ArrayList<>();
		for(Project p : projects) {
			dtos.add(mapper.toDto(p));
		}
		
		return new ResponseEntity<>(dtos, HttpStatus.OK);*/
	}

	@GetMapping("/select-option")
	public List<ProjectDto> getAllSelectOption(){
		List<ProjectDto> dtos= new ArrayList<>();
		for(Project p : service.findAll()) {
			if(p.getStatus() == Status.ACTIVE) {
				dtos.add(mapper.toDto(p));				
			}
		}
		return dtos;
	}
	
	/*
	 * {	
		    "projectName": "proejctname1",
		    "description": "proejctdescription1",
			"status": 1,
			"archive": false,
			"client": {
		        "id" : 2
		    },
		    "projectLead": {
		    	"id": 1
		    }
	   }
	 * */
	@PostMapping()
	@PreAuthorize("hasAuthority('ADMIN')")
	public ResponseEntity<ProjectDto> create(@RequestBody ProjectDto dto) {
		System.out.println("create = " + dto);
		dto.setStatus(Status.ACTIVE);
		dto.setArchive(false);
		try {
			return new ResponseEntity<>(mapper.toDto(service.save(mapper.toEntity(dto))), HttpStatus.CREATED);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}
	
	/*
	 * http://localhost:8080/projects/1
	 * */
	@GetMapping("/{id}")
	@PreAuthorize("hasAuthority('ADMIN')")
	public ResponseEntity<ProjectItemDto> getById(@PathVariable Long id) {
		Project entity = service.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Project with id :" + id + " doesn't exist"));
		return ResponseEntity.ok(mapper.toDtoItem(entity));
	}
		
	/*
	 * http://localhost:8080/projects/1
	 * {	
		    "projectName": "proejctname1changed",
		    "description": "proejctdescription1changed",
			"status": 0,
			"archive": true,
			"client": {
		        "id" : 2
		    }
	   }
	 * */
	@PutMapping("/{id}")
	@PreAuthorize("hasAuthority('ADMIN')")
	public ResponseEntity<ProjectDto> update(@PathVariable Long id,
										  @RequestBody ProjectDto newEntityDto){
		Project entity = mapper.toEntity(newEntityDto);
		try {
			return ResponseEntity.ok(mapper.toDto(service.update(entity, id)));
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
	
	/*
	 * http://localhost:8080/projects/1
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
