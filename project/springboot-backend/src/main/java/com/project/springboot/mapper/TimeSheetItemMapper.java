package com.project.springboot.mapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.project.springboot.dto.TimeSheetItemDto;
import com.project.springboot.model.Client;
import com.project.springboot.model.Project;
import com.project.springboot.model.TeamMember;
import com.project.springboot.model.TimeSheetItem;
import com.project.springboot.service.ClientService;
import com.project.springboot.service.ProjectService;
import com.project.springboot.service.TeamMemberService;

@Component
public class TimeSheetItemMapper implements IMapper<TimeSheetItem, TimeSheetItemDto>{

	@Autowired
	private ClientService clientService;
	@Autowired
	private ProjectService projectService;
	@Autowired
	private TeamMemberService teamMemberService;
	@Autowired 
	private ClientMapper clientMapper;
	@Autowired 
	private ProjectMapper projectMapper;
	@Autowired 
	private TeamMemberMapper teamMemberMapper;
	
	@Override
	public TimeSheetItem toEntity(TimeSheetItemDto dto) {
		TimeSheetItem entity = new TimeSheetItem();
		entity.setDescription(dto.getDescription());
		entity.setDate(dto.getDate());
		entity.setTime(dto.getTime());
		entity.setOvertime(dto.getOvertime());
		entity.setCategory(dto.getCategory());
		Client client = clientService.findById(dto.getClient().getId()).orElse(null);
		//System.out.println("found client = " + client.getId());
		entity.setClient(client);
		Project project = projectService.findById(dto.getProject().getId()).orElse(null);
		//System.out.println("found project = " + project.getId());
		entity.setProject(project);
		TeamMember teamMember = teamMemberService.findById(dto.getTeamMember().getId()).orElse(null);
		//System.out.println("found teamMember= " + teamMember.getId());
		entity.setTeamMember(teamMember);
		return entity;
	}

	@Override
	public TimeSheetItemDto toDto(TimeSheetItem entity) {
		TimeSheetItemDto dto = new TimeSheetItemDto();
		dto.setDescription(entity.getDescription());
		dto.setCategory(entity.getCategory());
		dto.setClient(clientMapper.toDto(entity.getClient()));
		dto.setDate(entity.getDate());
		dto.setId(entity.getId());
		dto.setOvertime(entity.getOvertime());
		dto.setProject(projectMapper.toDto(entity.getProject()));
		dto.setTeamMember(teamMemberMapper.toDto(entity.getTeamMember()));
		dto.setTime(entity.getTime());
		return dto;
	}

}
