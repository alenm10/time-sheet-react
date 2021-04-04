package com.project.springboot.dto;

import java.util.ArrayList;
import java.util.List;

import com.project.springboot.model.Project;

public class ClientDto {

	private Long id;
	private String clientName;
	private String address;
	private String city;
	private String country;
	private String postalCode;
	private List<ProjectDto> projects = new ArrayList<>();
	
	public ClientDto() {
		
	}
	
	public ClientDto(Long id, String clientName, String address, String city, String country, String postalCode) {
		super();
		this.id = id;
		this.clientName = clientName;
		this.address = address;
		this.city = city;
		this.country = country;
		this.postalCode = postalCode;
	}

	
	public ClientDto(Long id, String clientName, String address, String city, String country, String postalCode,
			List<ProjectDto> projects) {
		super();
		this.id = id;
		this.clientName = clientName;
		this.address = address;
		this.city = city;
		this.country = country;
		this.postalCode = postalCode;
		this.projects = projects;
	}

	
	@Override
	public String toString() {
		return "ClientDto [id=" + id + ", clientName=" + clientName + ", address=" + address + ", city=" + city
				+ ", country=" + country + ", postalCode=" + postalCode + ", projects=" + projects + "]";
	}

	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getClientName() {
		return clientName;
	}
	public void setClientName(String clientName) {
		this.clientName = clientName;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public List<ProjectDto> getProjects() {
		return projects;
	}
	public void setProjects(List<ProjectDto> projects) {
		this.projects = projects;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	public String getPostalCode() {
		return postalCode;
	}
	public void setPostalCode(String postalCode) {
		this.postalCode = postalCode;
	}
	
}
