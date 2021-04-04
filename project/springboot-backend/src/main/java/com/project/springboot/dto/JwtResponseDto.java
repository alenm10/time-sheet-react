package com.project.springboot.dto;

public class JwtResponseDto {
	private String token;

	public JwtResponseDto() {
	}

	public JwtResponseDto(String jwttoken) {
		this.token = jwttoken;
	}

	public String getToken() {
		return this.token;
	}
}