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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import com.project.springboot.exception.ResourceNotFoundException;
import com.project.springboot.model.Category;
import com.project.springboot.service.CategoryService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/categories")
public class CategoryController {

	@Autowired
	private CategoryService service;
	
	/*
	 * http://localhost:8080/categories/
	 * */
	@GetMapping()
	public List<Category> getAll(){
		return service.findAll();
	}		
	
	@GetMapping(path = "/page/{pageNum}")
	@PreAuthorize("hasAuthority('ADMIN')")
	public ResponseEntity<Page<Category>> getAllByPage(@PathVariable int pageNum) {
		Pageable pageRequest = PageRequest.of(pageNum - 1, 5);
    
		Page<Category> page = service.findAll(pageRequest);
		
		return new ResponseEntity<>(page, HttpStatus.OK);
	}

	/*
	 * {
		    "name": "firstcategory"
		}
	 * */
	@PostMapping()
	@PreAuthorize("hasAuthority('ADMIN')")
	public ResponseEntity<Category> create(@RequestBody Category category) {
		try {
			return new ResponseEntity<>(service.save(category), HttpStatus.CREATED);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}
	
	/*
	 * http://localhost:8080/categories/1
	 * */
	@GetMapping("/{id}")
	@PreAuthorize("hasAuthority('ADMIN')")
	public ResponseEntity<Category> getById(@PathVariable Long id) {
		Category category = service.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Category with id :" + id + " doesn't exist"));
		return ResponseEntity.ok(category);
	}
		
	/*
	 * http://localhost:8080/categories/1
	 * {
		    "name": "updatedCategory"
		}
	 * */
	@PutMapping("/{id}")
	@PreAuthorize("hasAuthority('ADMIN')")
	public ResponseEntity<Category> update(@PathVariable Long id,
								@RequestBody Category newCategory){
		try {
			return ResponseEntity.ok(service.update(newCategory, id));
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
	
	/*
	 * http://localhost:8080/categories/1
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
