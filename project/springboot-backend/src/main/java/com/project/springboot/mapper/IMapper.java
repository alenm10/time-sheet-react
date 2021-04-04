package com.project.springboot.mapper;

public interface IMapper<T,U> {

    T toEntity(U dto);

    U toDto(T entity);
}