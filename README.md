# A-Post-Comment-Backend

In this assignment you will build your own backend for a simple weblogs application.

## User story

- As a user: I can sign up, login, and only update my profile.
- As a user: I can see all posts and comments
- As a user: I can make my own post, edit it, and delete it.
- As a user: I can comment on any posts. Edit and delete my own comment.
- As a user: I cannot change anything that is not mine.

## Requirements:

- Must have Router, Models, and Controllers
- Use MongoDB, mongoose, bcryptjs, jwt
- Create Middleware, include validators
- All collections have their own folders (file structure is important!)
- All response need a status and json
- Must commit often! Commit as you finish up one feature.

## Models

##### Users

- firstName
- lastName
- username
- email
- password
- postHistory
- commentHistory

##### Posts

- title
- post
- commentHistory
- owner

##### Comments

- comment
- post
- owner

## Routes

##### User

- http://localhost:3001/users/create-user
- http://localhost:3001/users/login
- http://localhost:3001/users/update-profile

##### Post

- http://localhost:3001/posts/create-post
- http://localhost:3001/posts/get-all-post - will need to show comments of the post and owner
- http://localhost:3001/posts/delete-post - only the owner can do this
- http://localhost:3001/posts/update-post - only the owner can do this

##### Comment

- http://localhost:3001/comments/create-comment - must bring in a post id
- http://localhost:3001/comments/get-all-comment - get all comments from current user
- http://localhost:3001/comments/delete-comment - only the owner can do this
- http://localhost:3001/comments/update-comment - only the owner can do this
