import express from "express";
import resourceRoutes from './routes/resourceRoutes.js';
import authRoutes from './routes/authRoutes.js';
import mongoose from "mongoose";
import cors from "cors";

// database connections
await mongoose.connect(process.env.MONGO_URI);

// create the app
const app = express();

// use middlewares
app.use(cors());
app.use(express.json());

// use routers
// app.use("/api/v1", briandevRouter);
app.use('/api/auth',authRoutes);
app.use('/api/resources',resourceRoutes);

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
