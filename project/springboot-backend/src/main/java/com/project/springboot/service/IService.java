package com.project.springboot.service;

import java.util.List;
import java.util.Optional;

import com.project.springboot.model.TeamMember;

public interface IService<T> {

    List<T> findAll();

    Optional<T> findById(Long id);

    T save(T entity) throws Exception;

    T update(T entity, Long id) throws Exception;

    void delete(Long id) throws Exception;
}