package com.project.springboot.dto;

public class TeamMemberSelectOption {

	private long id;
	private String name;
	
	public TeamMemberSelectOption() {
		
	}
	
	public TeamMemberSelectOption(long id, String name) {
		super();
		this.id = id;
		this.name = name;
	}
	
	@Override
	public String toString() {
		return "TeamMemberSelectOption [id=" + id + ", name=" + name + "]";
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
	
}
