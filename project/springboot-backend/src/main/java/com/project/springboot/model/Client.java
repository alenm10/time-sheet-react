package com.project.springboot.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.voodoodyne.jackson.jsog.JSOGGenerator;

@Entity
@Table(name = "clients")
@JsonIdentityInfo(generator = JSOGGenerator.class)
public class Client {

	@Id
    @Column(name = "client_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
    @Column(name = "client_name")	
	private String clientName;
    
	private String address;
	
	private String city;
	
	private String country;
	
	@Column(name = "postal_code")	
	private String postalCode;
	
	@OneToMany(targetEntity=Project.class, 
			   mappedBy="client", 
			   cascade=CascadeType.ALL, 
			   fetch = FetchType.LAZY)    
	private List<Project> projects;

	private boolean isDeleted;

	public Client() {
		super();
	}
	
	public Client(Long id, String clientName, String address, String city, String country, 
			String postalCode, boolean isDeleted) {
		super();
		this.id = id;
		this.clientName = clientName;
		this.address = address;
		this.city = city;
		this.country = country;
		this.postalCode = postalCode;
		this.isDeleted = isDeleted;
	}

	public Client(Long id, String clientName, String address, String city, String country, String postalCode,
			List<Project> projects, boolean isDeleted) {
		super();
		this.id = id;
		this.clientName = clientName;
		this.address = address;
		this.city = city;
		this.country = country;
		this.postalCode = postalCode;
		this.projects = projects;
		this.isDeleted = isDeleted;
	}
	
	@Override
	public String toString() {
		return "Client [id=" + id + ", clientName=" + clientName + ", address=" + address + ", city=" + city
				+ ", country=" + country + ", postalCode=" + postalCode + ", projects=" + projects + ", isDeleted=" + isDeleted + "]";
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public List<Project> getProjects() {
		return projects;
	}

	public boolean isDeleted() {
		return isDeleted;
	}

	public void setDeleted(boolean isDeleted) {
		this.isDeleted = isDeleted;
	}

	public void setProjects(List<Project> projects) {
		this.projects = projects;
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
