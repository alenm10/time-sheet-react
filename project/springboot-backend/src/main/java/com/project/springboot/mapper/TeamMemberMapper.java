package com.project.springboot.mapper;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.project.springboot.dto.TeamMemberDto;
import com.project.springboot.model.Role;
import com.project.springboot.model.TeamMember;
import com.project.springboot.service.RoleService;

@Component
public class TeamMemberMapper implements IMapper<TeamMember, TeamMemberDto>{

	@Autowired
	private RoleService roleService;
	
	@Autowired
	private ProjectMapper projectMapper;
	
	@Override
	public TeamMember toEntity(TeamMemberDto dto) {
		TeamMember entity = new TeamMember();
		entity.setName(dto.getName());
		entity.setEmail(dto.getEmail());
		entity.setStatus(dto.getStatus());
		entity.setHoursPerWeek(dto.getHoursPerWeek());
		entity.setUsername(dto.getUsername());
		List<Role> roles = new ArrayList<>();
		Role role = roleService.findById(dto.getRole().getId()).orElse(null);
		System.out.println("foudn role = " + role);
		if(role != null) {
			roles.add(role);			
		}
		entity.setRoles(roles);
		return entity;
	}

	@Override
	public TeamMemberDto toDto(TeamMember entity) {
		TeamMemberDto dto = new TeamMemberDto();
		dto.setId(entity.getId());
		dto.setEmail(entity.getEmail());
		dto.setHoursPerWeek(entity.getHoursPerWeek());
		dto.setId(entity.getId());
		dto.setName(entity.getName());
		dto.setStatus(entity.getStatus());
		dto.setUsername(entity.getUsername());
		dto.setRoles(entity.getRoles());
		dto.setRole(entity.getRoles().get(0));
		//dto.setLeadingProject(projectMapper.toDto(entity.getLeadingProject()));
		return dto;
	}

	public TeamMemberDto toDtoForProject(TeamMember entity) {
		TeamMemberDto dto = new TeamMemberDto();
		dto.setId(entity.getId());
		dto.setName(entity.getName());
		return dto;
	}
}
