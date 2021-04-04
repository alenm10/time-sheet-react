package com.project.springboot.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.project.springboot.exception.ResourceNotFoundException;
import com.project.springboot.model.Role;
import com.project.springboot.service.RoleService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/roles")
public class RoleController {
	
	@Autowired
	private RoleService service;
	
	/*
	 * http://localhost:8080/roles
	 * */
	@GetMapping()
	public List<Role> getAll(){
		return service.findAll();
	}		
	
	/*
	 * {
		    "name": "newrole"
	   }
	 * */
	@PostMapping()
	@PreAuthorize("hasAuthority('ADMIN')")
	public ResponseEntity<Role> create(@RequestBody Role entity) {
		try {
			return new ResponseEntity<>(service.save(entity), HttpStatus.CREATED);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}
	
	/*
	 * http://localhost:8080/roles/2
	 * */
	@GetMapping("/{id}")
	@PreAuthorize("hasAuthority('ADMIN')")
	public ResponseEntity<Role> getById(@PathVariable Long id) {
		Role entity = service.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Role with id :" + id + " doesn't exist"));
		return ResponseEntity.ok(entity);
	}
		
	/*
	 * http://localhost:8080/roles/2
	 * {
		    "name": "newrolechanged"
	   }
	 * */
	@PutMapping("/{id}")
	@PreAuthorize("hasAuthority('ADMIN')")
	public ResponseEntity<Role> update(@PathVariable Long id,
								@RequestBody Role newEntity){
		try {
			return ResponseEntity.ok(service.update(newEntity, id));
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
	
	/*
	 * http://localhost:8080/roles/2
	 * */
	@DeleteMapping(value = "/{id}")
	@PreAuthorize("hasAuthority('ADMIN')")
	public ResponseEntity<String> delete(@PathVariable Long id) {
		Role entity = service.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Role with id :" + id + " doesn't exist"));
		
		service.delete(entity.getId());
		return new ResponseEntity<>("OK", HttpStatus.OK);
	}
}
