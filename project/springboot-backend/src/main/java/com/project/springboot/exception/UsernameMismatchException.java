package com.project.springboot.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class UsernameMismatchException extends RuntimeException{

	private static final long serialVersionUID = 1L;
	
	public UsernameMismatchException(String message) {
		super(message);
	}
}
