package com.project.springboot.dto;

public class UpdatePasswordDto {

	private String username;
	private String email;
	private String oldPassword;
	private String newPassword;
	
	public UpdatePasswordDto() {
		super();
	}
	
	public UpdatePasswordDto(String username, String oldPassword, String newPassword) {
		super();
		this.username = username;
		this.oldPassword = oldPassword;
		this.newPassword = newPassword;
	}
	
	public UpdatePasswordDto(String username, String email, String oldPassword, String newPassword) {
		super();
		this.username = username;
		this.email = email;
		this.oldPassword = oldPassword;
		this.newPassword = newPassword;
	}
	
	@Override
	public String toString() {
		return "UpdatePasswordDto [username=" + username + ", email=" + email + ", oldPassword=" + oldPassword
				+ ", newPassword=" + newPassword + "]";
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
	public String getOldPassword() {
		return oldPassword;
	}
	public void setOldPassword(String oldPassword) {
		this.oldPassword = oldPassword;
	}
	public String getNewPassword() {
		return newPassword;
	}
	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}
	
}
