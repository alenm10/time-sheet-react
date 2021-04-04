package com.project.springboot.mapper;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.project.springboot.dto.ClientSelectOption;
import com.project.springboot.dto.ProjectDto;
import com.project.springboot.dto.ProjectItemDto;
import com.project.springboot.dto.TeamMemberSelectOption;
import com.project.springboot.model.Client;
import com.project.springboot.model.Project;
import com.project.springboot.model.Role;
import com.project.springboot.model.TeamMember;
import com.project.springboot.service.ClientService;
import com.project.springboot.service.TeamMemberService;

@Component
public class ProjectMapper implements IMapper<Project, ProjectDto>{

	@Autowired
	private ClientService clientService;
	
	@Autowired
	private TeamMemberService teamMemberService;
	
	@Autowired
	private ClientMapper clientMapper;
	
	@Autowired
	private TeamMemberMapper teamMemberMapper;
	
	@Override
	public Project toEntity(ProjectDto dto) {
		Project project = new Project();
		project.setProjectName(dto.getProjectName());
		project.setDescription(dto.getDescription());
		project.setStatus(dto.getStatus());
		project.setArchive(dto.isArchive());
		Client client = clientService.findById(dto.getClient().getId()).orElse(null);
		if(client != null) {
			System.out.println("found client = " + client.getClientName());
			project.setClient(client);
		}
		TeamMember projectLead = teamMemberService.findById(dto.getProjectLead().getId()).orElse(null);
		if(projectLead != null) {
			System.out.println("found projectlead = " + projectLead.getName());
			project.setProjectLead(projectLead);
		}
		return project;
	}

	@Override
	public ProjectDto toDto(Project entity) {
		ProjectDto dto = new ProjectDto();
		dto.setProjectName(entity.getProjectName());
		dto.setDescription(entity.getDescription());
		dto.setStatus(entity.getStatus());
		dto.setArchive(entity.isArchive());
		dto.setId(entity.getId());
		dto.setProjectLead(teamMemberMapper.toDtoForProject(entity.getProjectLead()));
		dto.setClient(clientMapper.toDtoForProject(entity.getClient()));
		return dto;
	}

	public ProjectDto toDtoForProjectLead(Project entity) {
		ProjectDto dto = new ProjectDto();
		dto.setProjectName(entity.getProjectName());
		dto.setDescription(entity.getDescription());
		dto.setStatus(entity.getStatus());
		dto.setArchive(entity.isArchive());
		dto.setId(entity.getId());
		//dto.setProjectLead(teamMemberMapper.toDto(entity.getProjectLead()));
		dto.setClient(clientMapper.toDto(entity.getClient()));
		return dto;
	}
	
	public ProjectDto toDtoForClient(Project entity) {
		ProjectDto dto = new ProjectDto();
		dto.setProjectName(entity.getProjectName());
		dto.setDescription(entity.getDescription());
		dto.setStatus(entity.getStatus());
		dto.setArchive(entity.isArchive());
		dto.setId(entity.getId());
		dto.setProjectLead(teamMemberMapper.toDto(entity.getProjectTeamMembers().get(0)));
		//dto.setClient(clientMapper.toDto(entity.getClient()));
		return dto;
	}
	
	public ProjectItemDto toDtoItem(Project entity) {
		ProjectItemDto dto = new ProjectItemDto();
		dto.setStatus(entity.getStatus());
		dto.setArchive(entity.isArchive());
		dto.setId(entity.getId());
		dto.setClient(new ClientSelectOption(entity.getClient().getId(), entity.getClient().getClientName()));
		dto.setProjectLead(new TeamMemberSelectOption(entity.getProjectLead().getId(), entity.getProjectLead().getName()));
		dto.setName(entity.getProjectName());
		return dto;
	}

}
