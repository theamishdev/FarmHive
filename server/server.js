// server.js
import express from "express";
import dotenv from 'dotenv'
import cors from "cors";
import fs from "fs";
import path from "path";
import { body, validationResult } from "express-validator";
import connectDB from "./config/db.js";
import contactRouter from "./routes/contact.route.js";

dotenv.config();

// Database connection
await connectDB();

const app = express();
app.use(express.json());
app.use(cors());



// JSON file path for storing contact form data
const filePath = path.join(process.cwd(), "contact.json");


// ------------------------ LOGIN API ------------------------
app.post(
  "/login",
  [
    body("email").isEmail().withMessage("Enter a valid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Temporary hard-coded login (replace with DB later)
    if (email === "admin@farmhive.com" && password === "admin123") {
      return res.status(200).json({
        message: "Login successful",
        user: { email: email },
      });
    }

    return res.status(401).json({
      message: "Invalid email or password",
    });
  }
);



// Contact Router
app.use("/api/contact", contactRouter);

// ------------------------ START SERVER ------------------------
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

