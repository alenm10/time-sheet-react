package com.project.springboot.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.voodoodyne.jackson.jsog.JSOGGenerator;

@Entity
@Table(name = "confirmation_tokens")
@JsonIdentityInfo(generator = JSOGGenerator.class)
public class ConfirmationToken {

	@Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	private String email;
	
	private String token;
	
    @Column(name = "is_used")
	private boolean isUsed;

	public ConfirmationToken() {
		super();	
	}
	
	public ConfirmationToken(Long id, String email, String token, boolean isUsed) {
		super();
		this.id = id;
		this.email = email;
		this.token = token;
		this.isUsed = isUsed;
	}

	public ConfirmationToken(String email, String token, boolean isUsed) {
		super();
		this.email = email;
		this.token = token;
		this.isUsed = isUsed;
	}
	
	@Override
	public String toString() {
		return "ConfirmationToken [id=" + id + ", email=" + email + ", token=" + token + ", isUsed=" + isUsed + "]";
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public boolean isUsed() {
		return isUsed;
	}

	public void setUsed(boolean isUsed) {
		this.isUsed = isUsed;
	}
}
