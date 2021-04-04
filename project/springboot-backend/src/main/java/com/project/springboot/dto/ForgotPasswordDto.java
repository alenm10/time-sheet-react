package com.project.springboot.dto;

public class ForgotPasswordDto {
	private String token;
	private String password;

	public ForgotPasswordDto() {
		super();
	}
	
	public ForgotPasswordDto(String token, String password) {
		super();
		this.token = token;
		this.password = password;
	}
	
	
	@Override
	public String toString() {
		return "ForgotPasswordDto [token=" + token + ", password=" + password + "]";
	}

	public String getToken() {
		return token;
	}
	
	public void setToken(String token) {
		this.token = token;
	}
	
	public String getPassword() {
		return password;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}
}
