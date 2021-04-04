package com.project.springboot.dto;

import java.util.Date;

import com.project.springboot.model.Category;

public class TimeSheetItemDto {

	private Long id;
	private String description;
	private double time;
	private double overtime;
	private Date date;
	private ProjectDto project;
	private TeamMemberDto teamMember;
	private Category category;
	private ClientDto client;
	
	public TimeSheetItemDto() {
		super();	
	}
	
	public TimeSheetItemDto(Long id, String description, double time, double overtime, Date date, ProjectDto project,
			TeamMemberDto teamMember, Category category, ClientDto client) {
		super();
		this.id = id;
		this.description = description;
		this.time = time;
		this.overtime = overtime;
		this.date = date;
		this.project = project;
		this.teamMember = teamMember;
		this.category = category;
		this.client = client;
	}

	@Override
	public String toString() {
		return "TimeSheetItemDto [id=" + id + ", description=" + description + ", time=" + time + ", overtime="
				+ overtime + ", date=" + date + ", project=" + project + ", teamMember=" + teamMember + ", category="
				+ category + ", client=" + client + "]";
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public double getTime() {
		return time;
	}

	public void setTime(double time) {
		this.time = time;
	}

	public double getOvertime() {
		return overtime;
	}

	public void setOvertime(double overtime) {
		this.overtime = overtime;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public ProjectDto getProject() {
		return project;
	}

	public void setProject(ProjectDto project) {
		this.project = project;
	}

	public TeamMemberDto getTeamMember() {
		return teamMember;
	}

	public void setTeamMember(TeamMemberDto teamMember) {
		this.teamMember = teamMember;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public ClientDto getClient() {
		return client;
	}

	public void setClient(ClientDto client) {
		this.client = client;
	}
	
}
