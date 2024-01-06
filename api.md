# Endpoints
## /assignment/post
Post an assignment to the server, with these parameters:
user - user_id
course - course_id
day - due_day
month - due_month
year - due_year
title - title
Return a json object with all of the above, plus the assignment_id

## /assignment/get
Get a list of assignments based on userId, with parameter user = user_id
Return a json array of assignments

## /assignment/delete
Delete an assignment, with parameter id = assignment_id.

## /assignment/deleteAll
Delete all assignments created by a user, with parameter user = user_id

## /user/create
Create a user with the parameter password and email
Return a json with password, email and user_id on success

## /user/login
Check the user for logging in, with parameter password and email.
Return the user information json if correctly logged in, otherwise return nothing

## /user/delete
Delete a user's account and all its assignments, with parameter email and password
