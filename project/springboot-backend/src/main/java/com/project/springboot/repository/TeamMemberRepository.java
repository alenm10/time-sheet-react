package com.project.springboot.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.project.springboot.model.TeamMember;

@Repository
public interface TeamMemberRepository extends JpaRepository<TeamMember, Long>{
	TeamMember findTeamMemberByUsername(String username);
	TeamMember findTeamMemberByEmail(String email);
	List<TeamMember> findByIsDeletedFalseAndLeadingProjectIsNull();
	List<TeamMember> findByIsDeletedFalse();
	Page<TeamMember> findByIsDeletedFalse(Pageable pageRequest);
}
