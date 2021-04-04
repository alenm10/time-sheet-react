package com.project.springboot.dto;

import com.project.springboot.model.Status;

public class ProjectDto {

	private Long id;	
    private String projectName;
    private String description;
	private Status status;
	private boolean archive;
	private ClientDto client;
	private TeamMemberDto projectLead;
	
	public ProjectDto() {
		super();	
	}
	
	public ProjectDto(Long id, String projectName, String description, Status status, boolean archive,
			ClientDto client, TeamMemberDto projectLead) {
		super();
		this.id = id;
		this.projectName = projectName;
		this.description = description;
		this.status = status;
		this.archive = archive;
		this.client = client;
		this.projectLead = projectLead;
	}

	@Override
	public String toString() {
		return "ProjectDto [id=" + id + ", projectName=" + projectName + ", description=" + description + ", status="
				+ status + ", archive=" + archive + ", client=" + client + ", projectLead=" + projectLead + "]";
	}

	public TeamMemberDto getProjectLead() {
		return projectLead;
	}

	public void setProjectLead(TeamMemberDto projectLead) {
		this.projectLead = projectLead;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getProjectName() {
		return projectName;
	}

	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	public boolean isArchive() {
		return archive;
	}

	public void setArchive(boolean archive) {
		this.archive = archive;
	}

	public ClientDto getClient() {
		return client;
	}

	public void setClient(ClientDto client) {
		this.client = client;
	}

}
