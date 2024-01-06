package com.project.tracker;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;

@Entity
public class User {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private long user_id;
	private String email;
	private String password;
	
	public long getUser_id() {
		return user_id;
	}
	public String getEmail() {
		 return email;
	}
	public void setEmail(String Email) {
		 this.email = Email;
	}	
	public String getPassword() {
		 return password;
	}
	public void setPassword(String password) {
		 this.password = password;
	}

}
