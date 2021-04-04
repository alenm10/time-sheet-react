package com.project.springboot.dto;

public class ClientSelectOption {

	private long id;
	private String clientName;
	
	public ClientSelectOption() {
		
	}
	
	public ClientSelectOption(long id, String clientName) {
		super();
		this.id = id;
		this.clientName = clientName;
	}
	
	
	@Override
	public String toString() {
		return "ClientSelectOption [id=" + id + ", clientName=" + clientName + "]";
	}

	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getClientName() {
		return clientName;
	}
	public void setClientName(String clientName) {
		this.clientName = clientName;
	}

}
