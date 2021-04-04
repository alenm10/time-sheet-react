package com.project.springboot.dto;

import java.util.Date;

public class DateDto {
	private Date date;

	public DateDto() {
		super();	
	}
	
	public DateDto(Date date) {
		super();
		this.date = date;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}
}
