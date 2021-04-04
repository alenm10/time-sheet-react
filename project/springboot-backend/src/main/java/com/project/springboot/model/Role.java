package com.project.springboot.model;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name = "roles")
public class Role {

	@Id
    @Column(name = "role_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
     
    private String name;
    
    public Role() {
		super();
	}
    
    public Role(String name) {
		super();
		this.name = name;
	}
    
	public Role(Long id, String name) {
		super();
		this.id = id;
		this.name = name;
	}

    @Override
	public String toString() {
		return "Role [id=" + id + ", name=" + name + "]";
	}

	public Long getId() {
        return id;
    }

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setId(Long id) {
		this.id = id;
	}
    
}
