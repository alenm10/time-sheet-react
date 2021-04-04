package com.project.springboot.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.springboot.dto.ForgotPasswordDto;
import com.project.springboot.dto.JwtResponseDto;
import com.project.springboot.dto.TeamMemberDto;
import com.project.springboot.mapper.TeamMemberMapper;
import com.project.springboot.model.ConfirmationToken;
import com.project.springboot.model.TeamMember;
import com.project.springboot.service.AuthService;
import com.project.springboot.service.ConfirmationTokenService;
import com.project.springboot.service.TeamMemberService;

import java.util.UUID;

import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/auth")
public class AuthController {

	@Autowired
	public TeamMemberService teamMemberService;

	@Autowired
	public AuthService service;

	@Autowired
	public ConfirmationTokenService confirmationService;
	
	@Autowired
	private TeamMemberMapper mapper;
	
	@Autowired
	private JavaMailSender javaMailSender;

	/*
	 * {
		    "name": "myname",
			"username": "myusername",
			"email": "myemail@gmail.com",
			"hoursPerWeek": 25,
		    "status": 1,
		    "role": {
		        "id": 2
		    }
		}
	 * */
	@PostMapping("/register")
	public ResponseEntity<TeamMember> register(@RequestBody TeamMemberDto dto) {
		System.out.println("register = " + dto);
		try {
			return new ResponseEntity<>(service.register(mapper.toEntity(dto)), HttpStatus.CREATED);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}
	
	@PostMapping(value = "/login")
	public ResponseEntity<JwtResponseDto> login(@RequestBody TeamMemberDto dto) {
		System.out.println("login user = " + dto);
		JwtResponseDto jwt = service.logIn(dto);
		if (jwt != null) {
			return new ResponseEntity<JwtResponseDto>(jwt, HttpStatus.OK);
		}
		return new ResponseEntity<JwtResponseDto>(jwt, HttpStatus.BAD_REQUEST);
	}
	
	@PostMapping("/update")
	public ResponseEntity<TeamMember> updatePassword(@RequestBody TeamMemberDto dto) {
		System.out.println("update = " + dto);
		try {
			return new ResponseEntity<>(service.updatePassword(dto), HttpStatus.CREATED);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}
	
	@PostMapping("/forgot-password/{email}")
	public ResponseEntity<String> forgotPassword(@PathVariable String email) {
		System.out.println("forgotPassword = " + email);
		TeamMember e = teamMemberService.findTeamMemberByEmail(email);
		if(e != null) {
            ConfirmationToken confirmationToken = new ConfirmationToken(e.getEmail(),
													            		UUID.randomUUID().toString(),
													            		false);
            confirmationService.save(confirmationToken);
            
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setTo(e.getEmail());
            mailMessage.setSubject("Complete Password Reset!");
            mailMessage.setFrom("test-email@gmail.com");
            mailMessage.setText("To complete the password reset process, please click here: "
              + "http://localhost:3000/confirm-reset/"+confirmationToken.getToken());
            javaMailSender.send(mailMessage);
            
		} else {
			return new ResponseEntity<>("Email does not exist", HttpStatus.BAD_REQUEST);			
		}
		return new ResponseEntity<>("OK", HttpStatus.OK);
	}

	@PostMapping("/reset-forgot-password")
	public ResponseEntity<String> resetForgotPassword(@RequestBody ForgotPasswordDto dto) {
		System.out.println("resetForgotPassword = " + dto);
		ConfirmationToken c = confirmationService.findByToken(dto.getToken());
		if(c == null) {
			return new ResponseEntity<>("token not found", HttpStatus.BAD_REQUEST);			
		}
		TeamMember e = teamMemberService.resetForgotPassword(c.getEmail(), dto.getPassword());
		if(e != null) {
			c.setUsed(true);
			confirmationService.save(c);
		} else {
			return new ResponseEntity<>("team member not found", HttpStatus.BAD_REQUEST);				
		}
		return new ResponseEntity<>("OK", HttpStatus.OK);
	}
	
}
