package com.project.springboot.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.springboot.exception.ResourceNotFoundException;
import com.project.springboot.model.TimeSheetItem;
import com.project.springboot.repository.TimeSheetItemRepository;

@Service
public class TimeSheetItemService implements IService<TimeSheetItem>{

	@Autowired
	private TimeSheetItemRepository repository;
	
	@Override
	public List<TimeSheetItem> findAll() {
		return repository.findAll();
	}

	@Override
	public Optional<TimeSheetItem> findById(Long id) {
		return repository.findById(id);
	}

	@Override
	public TimeSheetItem save(TimeSheetItem entity) throws Exception {
		return repository.save(entity);
	}

	@Override
	public TimeSheetItem update(TimeSheetItem entity, Long id) throws Exception {
		TimeSheetItem oldEntity = repository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("TimeSheetItem with id :" + id + " doesn't exist"));
		oldEntity.setCategory(entity.getCategory());
		oldEntity.setClient(entity.getClient());
		//oldEntity.setDate(entity.getDate());
		oldEntity.setDescription(entity.getDescription());
		//oldEntity.setId(entity.getId());
		oldEntity.setOvertime(entity.getOvertime());
		oldEntity.setProject(entity.getProject());
		//oldEntity.setTeamMember(entity.getTeamMember());
		oldEntity.setTime(entity.getTime());
		return repository.save(oldEntity);
	}

	@Override
	public void delete(Long id) {
		repository.deleteById(id);
	}

	public List<TimeSheetItem> findByDateAndUsername(Date date, String username) {
		return repository.findAllByDateAndTeamMember_Username(date, username);
	}

	public List<TimeSheetItem> findByUsername(String username) {
		return repository.findAllByTeamMember_Username(username);
	}
}
