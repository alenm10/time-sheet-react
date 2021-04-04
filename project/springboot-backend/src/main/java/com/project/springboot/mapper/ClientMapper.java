package com.project.springboot.mapper;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.project.springboot.dto.ClientDto;
import com.project.springboot.dto.ProjectDto;
import com.project.springboot.model.Client;
import com.project.springboot.model.Project;

@Component
public class ClientMapper implements IMapper<Client, ClientDto>{

	@Autowired
	private ProjectMapper projectMapper;
	
	@Override
	public Client toEntity(ClientDto dto) {
		Client client = new Client();
		client.setClientName(dto.getClientName());
		client.setAddress(dto.getAddress());
		client.setCity(dto.getCity());
		client.setCountry(dto.getCountry());
		client.setPostalCode(dto.getPostalCode());
		return client;
	}

	@Override
	public ClientDto toDto(Client entity) {
		ClientDto dto = new ClientDto();
		dto.setId(entity.getId());
		dto.setAddress(entity.getAddress());
		dto.setCity(entity.getCity());
		dto.setClientName(entity.getClientName());
		dto.setCountry(entity.getCountry());
		dto.setPostalCode(entity.getPostalCode());
		List<ProjectDto> projectDtos = new ArrayList<>();
		for(Project p : entity.getProjects()) {
			projectDtos.add(projectMapper.toDto(p));
		}
		dto.setProjects(projectDtos);
		return dto;
	}
	
	public ClientDto toDtoForProject(Client entity) {
		ClientDto dto = new ClientDto();
		dto.setId(entity.getId());
		dto.setClientName(entity.getClientName());
		return dto;
	}

}
