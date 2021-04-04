package com.project.springboot.dto;

import java.util.List;

import com.project.springboot.model.Role;
import com.project.springboot.model.Status;

public class TeamMemberDto {

    private Long id;
	private String name;
	private String username;
	private String email;
	private double hoursPerWeek;
    private Status status;
    private Role role;
    private List<Role> roles;
    private ProjectDto leadingProject;
    private String password;
    
    public TeamMemberDto() {
    	
    }
    
	public TeamMemberDto(Long id, String name, String username, String email, List<Role> roles, String password, double hoursPerWeek, Status status) {
		super();
		this.id = id;
		this.name = name;
		this.username = username;
		this.email = email;
		this.hoursPerWeek = hoursPerWeek;
		this.status = status;
		this.roles = roles;
		this.password = password;
	}
	
	@Override
	public String toString() {
		return "TeamMemberDto [id=" + id + ", name=" + name + ", username=" + username + ", email=" + email
				+ ", hoursPerWeek=" + hoursPerWeek + ", status=" + status + ", role=" + role + ", leadingProject="
				+ leadingProject +  ", password=" + password + "]";
	}

	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}
	
	public ProjectDto getLeadingProject() {
		return leadingProject;
	}

	public void setLeadingProject(ProjectDto leadingProject) {
		this.leadingProject = leadingProject;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getUsername() {
		return username;
	}


	public void setUsername(String username) {
		this.username = username;
	}

	public List<Role> getRoles() {
		return roles;
	}

	public void setRoles(List<Role> roles) {
		this.roles = roles;
	}

	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}


	public double getHoursPerWeek() {
		return hoursPerWeek;
	}


	public void setHoursPerWeek(double hoursPerWeek) {
		this.hoursPerWeek = hoursPerWeek;
	}


	public Status getStatus() {
		return status;
	}


	public void setStatus(Status status) {
		this.status = status;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}
    
	
}
