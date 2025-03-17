-Project setup: npm init, install dependencies.
-Set up Express server with middleware (express.json(), cors,
-Connect to MongoDB using Mongoose.
-Create User model with name, email, password, timestamps.
-Create auth routes (register, login) with validation.
-Implement JWT authentication by JWT_SECRETE: generate token on login, middleware to verify token on protected routes.
-implement password hashing with bcrypt from jsonwbtoken
-Create Resource model with title, link, type, user reference.
-Create resource routes (POST, GET, DELETE) with auth middleware.
-Validate resource input with Joi.
-Implement controller functions for each route (registerUser, loginUser, addResource, getResources, deleteResource).
-Error handling: catch errors in async functions, send 500 on server errors, 404 if resource not found, etc.
-Test all endpoints.

***************************************************************
-The register route will validate the input (using Joi) for name, email, password, etc. Then check if the user already exists. If not, hash the password and save the user. 
-The login route will check the email and password, compare the hashed password, and return a token.
-The resource schema includes fields like title, link, type (course, book, tutorial).The type is an enum to restrict it to certain values. The user field will be an ObjectId referencing the User model.

-When adding a resource, the client will send the title, link, type, then user is taken from the authenticated user (req.user._id). So the POST body doesn't include the user ID; it's inferred from the token.
-when a user requests their resources, it should be a GET request that returns all resources where the user field matches their ID. In the controller, after authenticating, we do Resource.find({ user: req.user._id }).
-the user can only delete their own resources. So in the DELETE route, we check that the resource's user matches req.user._id before deleting.
-for security, passwords are hashed with bcrypt using a salt and storing JWT secret in environment variable. 

//dont commit .env, package-lock.json,node_modules to git