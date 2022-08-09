# Post Comment Backend

This is a full CRUD backend written in JS using Node, Express, and Mongoose. 

## Features
- User:
  - Signup
  - Login
  - Update profile
  - Get my posts
  - Get my comments
- Post
  - Create post
  - Edit post
  - Delete post
  - Get comments
- Comments
  - Create comment
  - Edit comment
  - Delete comment

## Details
- User data is validated with validator. 
- Passwords are hashed with bcryptjs
- On a successful login the server returns a JWT which is required for verification to perform any other action.
- Environment variables are used for various encryption variables
  
