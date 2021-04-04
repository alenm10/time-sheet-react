package com.project.springboot.model;

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
@Table(name = "projects")
@JsonIdentityInfo(generator = JSOGGenerator.class)
public class Project {

	@Id
    @Column(name = "project_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
    @Column(name = "project_name")	
	private String projectName;
    
	private String description;
	
	@Enumerated(EnumType.ORDINAL)
    private Status status;
	
	private boolean archive;
	
	@ManyToMany
	@JoinTable(name = "project_team_members", 
			   joinColumns = @JoinColumn(name = "project_id"), 
			   inverseJoinColumns = @JoinColumn(name = "user_id"))
	private List<TeamMember> projectTeamMembers;
	
	@ManyToOne()
	@JoinColumn(name="client_id", referencedColumnName = "client_id")    
	private Client client;
	
	@OneToOne(mappedBy = "leadingProject", fetch = FetchType.EAGER, optional = true,
            cascade = CascadeType.ALL)
    private TeamMember projectLead;
	
	@OneToMany(targetEntity=TimeSheetItem.class, 
			   mappedBy="project", 
			   cascade=CascadeType.ALL, 
			   fetch = FetchType.LAZY)    
	private List<TimeSheetItem> timeSheetItems;
	
	private boolean isDeleted;
	
	public Project() {
		super();
	}
	
	public Project(Long id, String projectName, String description, Status status, boolean archive, boolean isDeleted) {
		super();
		this.id = id;
		this.projectName = projectName;
		this.description = description;
		this.status = status;
		this.archive = archive;
		this.isDeleted = isDeleted;
	}

	@Override
	public String toString() {
		return "Project [id=" + id + ", projectName=" + projectName + ", description=" + description + ", status="
				+ status + ", archive=" + archive + ", projectTeamMembers=" + projectTeamMembers + ", client=" + client
				+ ", projectLead=" + projectLead + ", timeSheetItems=" + timeSheetItems + ", isDeleted=" + isDeleted + "]";
	}

	public TeamMember getProjectLead() {
		return projectLead;
	}

	public void setProjectLead(TeamMember projectLead) {
		this.projectLead = projectLead;
	}

	public List<TeamMember> getProjectTeamMembers() {
		return projectTeamMembers;
	}

	public void setProjectTeamMembers(List<TeamMember> projectTeamMembers) {
		this.projectTeamMembers = projectTeamMembers;
	}

	public Client getClient() {
		return client;
	}

	public void setClient(Client client) {
		this.client = client;
	}

	public List<TimeSheetItem> getTimeSheetItems() {
		return timeSheetItems;
	}

	public void setTimeSheetItems(List<TimeSheetItem> timeSheetItems) {
		this.timeSheetItems = timeSheetItems;
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

	public boolean isDeleted() {
		return isDeleted;
	}

	public void setDeleted(boolean isDeleted) {
		this.isDeleted = isDeleted;
	}

}
