package com.project.springboot.model;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.voodoodyne.jackson.jsog.JSOGGenerator;

@Entity
@Table(name = "team_members")
@JsonIdentityInfo(generator = JSOGGenerator.class)
public class TeamMember {

	@Id
    @Column(name = "user_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	@Column(name = "name")
	private String name;

	@Column(name = "username")
	private String username;

	@Column(name = "email")
	private String email;

	@Column(name = "password")
	private String password;
	
	@Column(name = "hours_per_week")
	private double hoursPerWeek;

	@Enumerated(EnumType.ORDINAL)
    private Status status;
 
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "users_roles", joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "user_id"), 
	inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "role_id"))
	private List<Role> roles;
	
	@ManyToMany(mappedBy = "projectTeamMembers")
	private List<Project> projects;
	
	@OneToMany(targetEntity=TimeSheetItem.class, 
			   mappedBy="teamMember", 
			   cascade=CascadeType.ALL, 
			   fetch = FetchType.LAZY)    
	private List<TimeSheetItem> timeSheetItems;
	
	@OneToOne(fetch = FetchType.EAGER, optional = true)
    @JoinColumn(name = "project_id", nullable = true)
    private Project leadingProject;
	
	private boolean isDeleted;
	
	private boolean updatePassword;
	
	public TeamMember() {
		super();
	}
	
    public TeamMember(Long id, String name, String username, String email, double hoursPerWeek, Status status,
    		List<Role> roles, boolean isDeleted, String password, boolean updatePassword) {
		super();
		this.id = id;
		this.name = name;
		this.username = username;
		this.email = email;
		this.hoursPerWeek = hoursPerWeek;
		this.status = status;
		this.roles = roles;
		this.isDeleted = isDeleted;
		this.password = password;
		this.updatePassword = updatePassword;
	}

	@Override
	public String toString() {
		return "TeamMember [id=" + id + ", name=" + name + ", username=" + username + ", email=" + email
				+ ", hoursPerWeek=" + hoursPerWeek + ", status=" + status 
				+ ", roles=" + roles + ", isDeleted=" + isDeleted + ", password=" + password + ", updatePassword=" + updatePassword +"]";
	}

	public Long getId() {
        return id;
    }

	public String getName() {
		return name;
	}

	public List<Project> getProjects() {
		return projects;
	}

	public void setProjects(List<Project> projects) {
		this.projects = projects;
	}

	public List<TimeSheetItem> getTimeSheetItems() {
		return timeSheetItems;
	}

	public void setTimeSheetItems(List<TimeSheetItem> timeSheetItems) {
		this.timeSheetItems = timeSheetItems;
	}

	public Project getLeadingProject() {
		return leadingProject;
	}

	public void setLeadingProject(Project leadingProject) {
		this.leadingProject = leadingProject;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
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

	public List<Role> getRoles() {
		return roles;
	}

	public void setRoles(List<Role> roles) {
		this.roles = roles;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public boolean isDeleted() {
		return isDeleted;
	}

	public void setDeleted(boolean isDeleted) {
		this.isDeleted = isDeleted;
	}

	public boolean isUpdatePassword() {
		return updatePassword;
	}

	public void setUpdatePassword(boolean updatePassword) {
		this.updatePassword = updatePassword;
	}
    
}
