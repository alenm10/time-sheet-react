package com.project.springboot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;

import com.project.springboot.config.JwtTokenUtil;
import com.project.springboot.dto.JwtResponseDto;
import com.project.springboot.dto.TeamMemberDto;
import com.project.springboot.exception.ResourceExistsException;
import com.project.springboot.model.TeamMember;
import com.project.springboot.repository.TeamMemberRepository;

@Service
public class AuthService {

	@Autowired
	TeamMemberRepository repository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtUserDetailsService jwtUserDetailsService;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;
	
	public TeamMember register(TeamMember entity) {
		if(repository.findTeamMemberByEmail(entity.getEmail()) != null) {
			throw new ResourceExistsException("email already exist");
		}
		if(repository.findTeamMemberByUsername(entity.getUsername()) != null) {
			throw new ResourceExistsException("username already exist");
		}
		entity.setPassword(passwordEncoder.encode("admin"));
		entity.setUpdatePassword(true);
		System.out.println("register user = " + entity);

		return repository.save(entity);
	}
	
	public JwtResponseDto logIn(TeamMemberDto authenticationRequest) {
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
					authenticationRequest.getUsername(), authenticationRequest.getPassword()));
		} catch (BadCredentialsException | InternalAuthenticationServiceException e) {
			e.printStackTrace();
			throw new BadCredentialsException("Bad credentials.");
		}
		final UserDetails userDetails = jwtUserDetailsService.loadUserByUsername(authenticationRequest.getUsername());
		System.out.println("userDetails = " + userDetails);
		final String jwt = jwtTokenUtil.generateToken(userDetails);
		System.out.println("jwt = " + jwt);
		JwtResponseDto jwtDto = new JwtResponseDto(jwt);
		System.out.println("jwtDto = " + jwtDto);
		
		return jwtDto;
	}
	
	public TeamMember updatePassword(TeamMemberDto dto) {
		TeamMember teamMember = repository.findTeamMemberByUsername(dto.getUsername());
		teamMember.setPassword(passwordEncoder.encode(dto.getPassword()));
		teamMember.setUpdatePassword(false);
		return repository.save(teamMember);
	}
	
	/*public TeamMember resetForgotPassword(TeamMember e, String newPassword) {
		e.setPassword(passwordEncoder.encode(newPassword));
		return repository.save(e);
	}*/
}
