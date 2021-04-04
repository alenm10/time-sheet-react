package com.project.springboot.controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

import com.project.springboot.dto.DateDto;
import com.project.springboot.dto.TimeSheetItemDto;
import com.project.springboot.exception.ResourceNotFoundException;
import com.project.springboot.mapper.TimeSheetItemMapper;
import com.project.springboot.model.TeamMember;
import com.project.springboot.model.TimeSheetItem;
import com.project.springboot.service.TimeSheetItemService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/time-sheet-items")
public class TimeSheetItemController {

	@Autowired
	private TimeSheetItemService service;
	
	@Autowired
	private TimeSheetItemMapper mapper;
	
	/*
	 * http://localhost:8080/time-sheet-items
	 * */
	@GetMapping()
	public List<TimeSheetItemDto> getAll(){
		System.out.println("getAll");
		List<TimeSheetItemDto> list = new ArrayList<>();
		for(TimeSheetItem item : service.findAll()) {
			list.add(mapper.toDto(item));
		}
		return list;
	}		
	
	@GetMapping("/month/{month}")
	public ResponseEntity<String> getTotalHoursForMonth(@PathVariable int month) {
		Authentication data = SecurityContextHolder.getContext().getAuthentication();
		String username = data.getName();
		System.out.println("getTotalHoursForMonth = " + username + " " + month);
		double total = 0;
		for(TimeSheetItem item : service.findByUsername(username)) {
			System.out.println(item.getDate().getMonth());
			if(item.getDate().getMonth() == month) {
				total += item.getTime() + item.getOvertime();
			}
		}
		return new ResponseEntity<>(Double.toString(total), HttpStatus.OK);
	}	
	@GetMapping("/date/{dateString}")
	public ResponseEntity<List<TimeSheetItemDto>> getForUserAndDate(@PathVariable String dateString){
		Authentication data = SecurityContextHolder.getContext().getAuthentication();
		String username = data.getName();
		System.out.println("dateString = " + dateString);
		String[] ymd = dateString.split("-");
		Calendar cal = Calendar.getInstance();
        cal.set(Calendar.YEAR, Integer.parseInt(ymd[0]));
        cal.set(Calendar.MONTH, Integer.parseInt(ymd[1])-1);
        cal.set(Calendar.DAY_OF_MONTH, Integer.parseInt(ymd[2]));
        cal.set(Calendar.HOUR_OF_DAY, 1);
        cal.set(Calendar.MINUTE, 0);
        cal.set(Calendar.SECOND, 0);
        cal.set(Calendar.MILLISECOND, 0);
        Date date = cal.getTime();
        System.out.println("date = " + date);
		try {
			List<TimeSheetItemDto> dtos = new ArrayList<>();
			for(TimeSheetItem item : service.findByDateAndUsername(date, username)) {
				System.out.print("imte = " + item.getDescription());
				dtos.add(mapper.toDto(item));
			}
			return new ResponseEntity<>(dtos, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
	
	/*
	 * {	
		    "description": "somedescription",
			"time": 20,
			"overtime": 5,
			"date": "1401685200",
			"project": {
		        "id": 2
		    },
			"teamMember": {
		        "id": 1
		    },
			"category": {
		        "id": 2
		    },
			"client": {
		        "id": 2
		    } 
	   }
	 * */
	@PostMapping()
	public ResponseEntity<TimeSheetItemDto> create(@RequestBody TimeSheetItemDto dto) {
		System.out.println("create");
		try {
			TimeSheetItem created = service.save(mapper.toEntity(dto));
			return new ResponseEntity<>(mapper.toDto(created), HttpStatus.CREATED);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}
	
	/*
	 * http://localhost:8080/time-sheet-items/1
	 * */
	@GetMapping("/{id}")
	public ResponseEntity<TimeSheetItemDto> getById(@PathVariable Long id) {
		TimeSheetItem entity = service.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("TimeSheetItem with id :" + id + " doesn't exist"));
		return ResponseEntity.ok(mapper.toDto(entity));
	}
		
	/*
	 * {	
		    "description": "descriptionchanged",
			"time": 40,
			"overtime": 20,
			"date": "1401685200",
			"project": {
		        "id": 2
		    },
			"teamMember": {
		        "id": 1
		    },
			"category": {
		        "id": 2
		    },
			"client": {
		        "id": 2
		    } 
	   }
	 * */
	@PutMapping("/{id}")
	public ResponseEntity<TimeSheetItemDto> update(@PathVariable Long id,
								@RequestBody TimeSheetItemDto newEntityDto){
		
		TimeSheetItem entity = mapper.toEntity(newEntityDto);

		try {
			return ResponseEntity.ok(mapper.toDto(service.update(entity, id)));
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
	
	/*
	 * http://localhost:8080/time-sheet-items/1
	 * */
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<String> delete(@PathVariable Long id) {
		TimeSheetItem entity = service.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("TimeSheetItem with id :" + id + " doesn't exist"));
		
		service.delete(entity.getId());
		return new ResponseEntity<>("OK", HttpStatus.OK);
	}
	
}
