package com.project.springboot.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.springboot.model.TimeSheetItem;

@Repository
public interface TimeSheetItemRepository extends JpaRepository<TimeSheetItem, Long>{
    List<TimeSheetItem> findAllByDateAndTeamMember_Username(Date date, String username);
    List<TimeSheetItem> findAllByTeamMember_Username(String username);
    List<TimeSheetItem> findAllByDate(Date date);
}
