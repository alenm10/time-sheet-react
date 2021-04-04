package com.project.springboot.service;

import java.util.Collection;
import java.util.HashSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.project.springboot.model.TeamMember;
import com.project.springboot.repository.TeamMemberRepository;

@Service
public class JwtUserDetailsService implements UserDetailsService {

	@Autowired
	TeamMemberRepository repository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		System.out.println("loadUserByUsername = " + username);
		TeamMember user = repository.findTeamMemberByUsername(username);
		if (user == null) {
			throw new UsernameNotFoundException(String.format("No user found with username '%s'.", username));
		} else {
			SimpleGrantedAuthority authority = new SimpleGrantedAuthority(user.getRoles().get(0).getName());
			Collection<SimpleGrantedAuthority> authorities = new HashSet<SimpleGrantedAuthority>();
			authorities.add(authority);
			return new User(user.getUsername(), user.getPassword(), authorities);
		}
	}

}
