package com.project.springboot.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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

import com.project.springboot.dto.ClientDto;
import com.project.springboot.dto.ClientSelectOption;
import com.project.springboot.exception.ResourceNotFoundException;
import com.project.springboot.mapper.ClientMapper;
import com.project.springboot.model.Category;
import com.project.springboot.model.Client;
import com.project.springboot.service.ClientService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/clients")
public class ClientController {
	
	@Autowired
	private ClientService service;
	
	@Autowired
	private ClientMapper mapper;
	
	/*
	 * http://localhost:8080/clients
	 * */
	@GetMapping()
	@PreAuthorize("hasAuthority('ADMIN')")
	public List<Client> getAll(){
		return service.findAll();
	}		
	
	/*
	 * http://localhost:8080/clients/page/1
	 * */
	@GetMapping(path = "/page/{pageNum}")
	@PreAuthorize("hasAuthority('ADMIN')")
	public ResponseEntity<Page<Client>> getAllByPage(@PathVariable int pageNum) {
		Pageable pageRequest = PageRequest.of(pageNum - 1, 5);
    
		Page<Client> page = service.findAll(pageRequest);
		
		return new ResponseEntity<>(page, HttpStatus.OK);
	}
	
	/*
	 * http://localhost:8080/clients/search/somename
	 * */
	@GetMapping(path = "/search/{name}/{pageNum}")
	@PreAuthorize("hasAuthority('ADMIN')")
	public ResponseEntity<Page<Client>> searchByName(@PathVariable String name,
													 @PathVariable int pageNum) {
		Pageable pageRequest = PageRequest.of(pageNum - 1, 5);
	    
		Page<Client> page = service.findByClientName(name, pageRequest);
		
		return new ResponseEntity<>(page, HttpStatus.OK);

		/*List<Client> clients = service.findByClientName(name);
		
		if(clients.size() == 0) {
			return new ResponseEntity<>(new ArrayList<>(), HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(clients, HttpStatus.OK);*/
	}
	
	/*
	 * http://localhost:8080/clients/filter/A
	 * */
	@GetMapping(path = "/filter/{letter}/{pageNum}")
	@PreAuthorize("hasAuthority('ADMIN')")
	public ResponseEntity<Page<Client>> filter(@PathVariable String letter,
			 								   @PathVariable int pageNum) {
		Pageable pageRequest = PageRequest.of(pageNum - 1, 5);
	    
		Page<Client> page = service.findByClientNameStartsWith(letter, pageRequest);
		
		return new ResponseEntity<>(page, HttpStatus.OK);
		
		
		/*List<Client> clients = service.findByClientNameStartsWith(letter);
		
		if(clients.size() == 0) {
			return new ResponseEntity<>(new ArrayList<>(), HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(clients, HttpStatus.OK);*/
	}
	
	@GetMapping("/select-option")
	public List<ClientSelectOption> getAllSelectOption(){
		List<ClientSelectOption> clients = new ArrayList<>();
		System.out.println("getall clients");
		for(Client c : service.findAll()) {
			clients.add(new ClientSelectOption(c.getId(), c.getClientName()));
		}
		System.out.println(clients);
		return clients;
	}
	
	/*
	 * {
		    "clientName": "clientname1",
		    "address": "address1",
		    "city": "city1",
		    "country": "country1",
		    "postalCode": "1010"
	    }
	 * */
	@PostMapping()
	@PreAuthorize("hasAuthority('ADMIN')")
	public ResponseEntity<Client> create(@RequestBody ClientDto dto) {
		System.out.println("create = " + dto);
		try {
			return new ResponseEntity<>(service.save(mapper.toEntity(dto)), HttpStatus.CREATED);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}
	
	/*
	 * http://localhost:8080/clients/1
	 * */
	@GetMapping("/{id}")
	@PreAuthorize("hasAuthority('ADMIN')")
	public ResponseEntity<Client> getById(@PathVariable Long id) {
		Client entity = service.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Client with id :" + id + " doesn't exist"));
		return ResponseEntity.ok(entity);
	}
	
	/*
	 * http://localhost:8080/clients/1
	 * {
		    "clientName": "clientname1changed",
		    "address": "address1hanged",
		    "city": "city1hanged",
		    "country": "country1hanged",
		    "postalCode": "1010hanged"
	    }	
	 * */
	@PutMapping("/{id}")
	@PreAuthorize("hasAuthority('ADMIN')")
	public ResponseEntity<Client> update(@PathVariable Long id,
								@RequestBody ClientDto newClientDto){
		Client entity = mapper.toEntity(newClientDto);
		try {
			return ResponseEntity.ok(service.update(entity, id));
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
	
	/*
	 * http://localhost:8080/clients/1
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
