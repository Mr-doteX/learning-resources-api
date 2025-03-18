import express from "express";
import { registerUser, loginUser, getAllUsers } from "../controllers/authcontroller.js"; 
import { addResource, deleteResource, getResource } from "../controllers/resourcecontrollers.js";
import auth from "../middleware/auth.js";


const learnRoutes = express.Router();

// register user
learnRoutes.post("/register", registerUser);

// login routes
learnRoutes.post("/login", loginUser);

// get all users
learnRoutes.get("/users", getAllUsers);

// add a resource
learnRoutes.post("/resource",auth, addResource);

// get/view all resources
learnRoutes.get("/resource", auth, getResource);

// delete resources
learnRoutes.delete("/resource/:id", auth, deleteResource);

export default learnRoutes;
