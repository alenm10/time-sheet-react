package com.project.springboot.model;


import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.voodoodyne.jackson.jsog.JSOGGenerator;

@Entity
@Table(name = "time_sheet_items")
@JsonIdentityInfo(generator = JSOGGenerator.class)
public class TimeSheetItem {

	@Id
    @Column(name = "time_sheet_item_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	private String description;
	
	private double time;
	
	private double overtime;
	
    @Temporal(TemporalType.DATE)
	private Date date;

	@ManyToOne()
	@JoinColumn(name="project_id", referencedColumnName = "project_id")    
	private Project project;
	
	@ManyToOne()
	@JoinColumn(name="user_id", referencedColumnName = "user_id")    
	private TeamMember teamMember;
	
	@ManyToOne()
	@JoinColumn(name = "category_id", referencedColumnName = "category_id")
	private Category category;

	@ManyToOne()
	@JoinColumn(name = "client_id", referencedColumnName = "client_id")
	private Client client;

	public TimeSheetItem() {
		super();
	}
	
	public TimeSheetItem(Long id, String description, double time, double overtime, Date date) {
		super();
		this.id = id;
		this.description = description;
		this.time = time;
		this.overtime = overtime;
		this.date = date;
	}

	
	@Override
	public String toString() {
		return "TimeSheetItem [id=" + id + ", description=" + description + ", time=" + time + ", overtime=" + overtime
				+ ", date=" + date + ", project=" + project + ", teamMember=" + teamMember + ", category=" + category
				+ ", client=" + client + "]";
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

	public Project getProject() {
		return project;
	}

	public void setProject(Project project) {
		this.project = project;
	}

	public TeamMember getTeamMember() {
		return teamMember;
	}

	public void setTeamMember(TeamMember teamMember) {
		this.teamMember = teamMember;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public Client getClient() {
		return client;
	}

	public void setClient(Client client) {
		this.client = client;
	}
	
}
