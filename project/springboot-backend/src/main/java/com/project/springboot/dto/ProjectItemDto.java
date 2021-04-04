package com.project.springboot.dto;

import com.project.springboot.model.Status;

public class ProjectItemDto {

	private long id;
	private String name;
	private ClientSelectOption client;
	private TeamMemberSelectOption projectLead;
	private Status status;
	private boolean archive;
	
	public ProjectItemDto() {
		
	}
	
	public ProjectItemDto(long id, String name, ClientSelectOption client, TeamMemberSelectOption projectLead,
			Status status, boolean archive) {
		super();
		this.id = id;
		this.name = name;
		this.client = client;
		this.projectLead = projectLead;
		this.status = status;
		this.archive = archive;
	}
	@Override
	public String toString() {
		return "ProjectItemDto [id=" + id + ", name=" + name + ", client=" + client + ", projectLead=" + projectLead
				+ ", status=" + status + ", isArchive=" + archive + "]";
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public ClientSelectOption getClient() {
		return client;
	}
	public void setClient(ClientSelectOption client) {
		this.client = client;
	}
	public TeamMemberSelectOption getProjectLead() {
		return projectLead;
	}
	public void setProjectLead(TeamMemberSelectOption projectLead) {
		this.projectLead = projectLead;
	}
	public Status getStatus() {
		return status;
	}
	public void setStatus(Status status) {
		this.status = status;
	}
	public boolean getArchive() {
		return archive;
	}
	public void setArchive(boolean isArchive) {
		this.archive = isArchive;
	}
	
}
