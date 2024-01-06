# Deploying Locally
To deploy locally, mysql must be installed. After running the setup below, head to src/main/resources/application.properties and add the password for mysql on the local machine. Finally, start the server and the frontend code.

## Mysql Setup
Run these commands:
mysql -u root -p
[Enter password]
create database TrackerProject;
create user 'admin01'@'%' identified by '123456';
USE TrackerProject
grant all on TrackerProject to admin01@'%';

CREATE TABLE assignment (
	assignment_id SERIAL,
	user_id BIGINT UNSIGNED,
	title VARCHAR(100),
	course_id VARCHAR(10),
	due_day INT,
	due_month INT,
	due_year INT,
	FOREIGN KEY (user_id) REFERENCES user(user_id)
	ON DELETE CASCADE
);

CREATE TABLE user (
	user_id SERIAL,
	email VARCHAR(40) UNIQUE,
	password VARCHAR(30)
);	
