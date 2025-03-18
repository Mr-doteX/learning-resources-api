import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import learnRoutes from './routes/learnRoutes.js';

// database connections
await mongoose.connect(process.env.MONGO_URI);

// create the app
const app = express();

// use middlewares
app.use(cors());
app.use(express.json());

// use routers
app.use("/api/auth", learnRoutes);
app.use("/api/resource", learnRoutes);


// error handling middleware
app.use((err, req, res, next) => {
console.error(err.stack);
res.status(500).json({ message: "hmm, you broke the app!" });
});

// starting server
const port = process.env.PORT || 5000;
app.listen(port, () => {
console.log(`server is active on ${port}`);
});
