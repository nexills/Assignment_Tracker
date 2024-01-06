package com.project.tracker;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Assignment {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private java.math.BigInteger assignment_id;
	
	private java.math.BigInteger user_id;
	private String title;
	private String course_id;
	private int due_day;
	private int due_month;
	private int due_year;
	
	public java.math.BigInteger getAssignment_id() {
		return assignment_id;
	}
	public java.math.BigInteger getUser_id() {
		return user_id;
	}
	public void setUser_id(java.math.BigInteger id) {
		this.user_id = id;
	}
	public String getTitle() {
		 return title;
	}
	public void setTitle(String Title) {
		 this.title = Title;
	}	
	public String getCourse_id() {
		 return course_id;
	}
	public void setCourse_id(String Courseid) {
		 this.course_id = Courseid;
	}	
	public int getDue_day() {
		 return due_day;
	}
	public void setDue_day(int due) {
		 this.due_day = due;
	}
	public int getDue_month() {
		 return due_month;
	}
	public void setDue_month(int due) {
		 this.due_month = due;
	}
	public int getDue_year() {
		 return due_year;
	}
	public void setDue_year(int due) {
		 this.due_year = due;
	}

}
