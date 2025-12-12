// server.js
import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { body, validationResult } from "express-validator";

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


// ------------------------ CONTACT FORM API ------------------------
app.post("/api/contact", (req, res) => {
  try {
    const newEntry = req.body;

    // Add timestamp
    newEntry.date = new Date().toISOString();

    let existingData = [];

    // Read file if exists
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      existingData = JSON.parse(fileContent || "[]");
    }

    // Add new entry
    existingData.push(newEntry);

    // Save updated data
    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));

    res.status(200).json({ message: "Contact saved successfully!" });

  } catch (error) {
    console.error("Error saving contact data:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// ------------------------ START SERVER ------------------------
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
