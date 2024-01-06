package com.project.tracker;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
public class AppController {
	
	@Autowired
	private AssignmentRepo assignmentRepo;
	
	@Autowired
	private UserRepo userRepo;
	
	@PostMapping("/assignment/post")
	public Assignment post_assignment(@RequestBody Assignment_request A) {
		Assignment B = new Assignment();
		B.setCourse_id(A.getCourse_id());
		B.setDue_day(A.getDue_day());
		B.setDue_month(A.getDue_month());
		B.setDue_year(A.getDue_year());
		B.setTitle(A.getTitle());
		B.setUser_id(A.getUser_id());
		assignmentRepo.save(B);
		return B;
	}
	
	@GetMapping("/assignment/get")
	public List<Assignment> get_assignment(
			@RequestParam(value = "user", defaultValue = "-1") java.math.BigInteger user
			) {
		return assignmentRepo.findByUser(user);
	}
	
	@DeleteMapping("/assignment/delete")
	public void delete_assignment(
			@RequestParam(value = "id") int assignment_id) {
		assignmentRepo.deleteById(assignment_id);
	}

	@DeleteMapping("/assignment/deleteAll")
	public void delete_all(
			@RequestParam(value = "user") java.math.BigInteger user) {
		assignmentRepo.deleteByUser(user);
	}
	
	@PostMapping("/user/create")
	public User create_user(
			@RequestParam(value = "email") String email,
			@RequestParam(value = "password") String password) {
		User newuser = new User();
		
		newuser.setEmail(email);
		newuser.setPassword(password);
		userRepo.save(newuser);
		return newuser;
	}
	
	@GetMapping("/user/login")
	public List<User> login_user(
			@RequestParam(value = "email") String email,
			@RequestParam(value = "password") String password) {
		User user = userRepo.findByEmail(email);
		List<User> list = new ArrayList<User> (); 
		if (user == null) return list;
		if (user.getPassword().equals(password)) {
			list.add(user);
			return list;
		} else {
			return list;
		}	
	}
	
	@DeleteMapping("/user/delete")
	public void delete_user(
			@RequestParam(value = "email") String email,
			@RequestParam(value = "password") String password) {
		User user = userRepo.findByEmail(email);
		if (user == null) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User not found");
		}
		if (user.getPassword().equals(password)) {
			userRepo.deleteByEmail(email);
		} else {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Incorrect Password");
		}
	}

}