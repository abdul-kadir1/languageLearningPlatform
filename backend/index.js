// import express from "express";
// import "dotenv/config";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import path from "path";

// import authRoutes from "./src/routes/auth.route.js";
// import userRoutes from "./src/routes/user.route.js";
// import chatRoutes from "./src/routes/chat.route.js";
// import chatbotRoutes from "./src/routes/chatbot.route.js";
// import { connectDB } from "./src/lib/db.js";
// import { chatWithBot  } from "./src/controllers/chatbot.controller.js";



// const app = express();
// const PORT = process.env.PORT;
// const __dirname = path.resolve();


// app.use(
//   cors({
//     origin:"https://languagelearningplatform.onrender.com",
//     credentials: true,
//   })
// );

 


// app.use(express.json());
// app.use(cookieParser());

// app.post("/chatbot", chatWithBot );

// // ================= ROUTES ========================
// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/chat", chatRoutes);
// app.use("/api/chatbot", chatbotRoutes);

// // if (process.env.NODE_ENV === "production") {
// //   app.use(express.static(path.join(__dirname, "../frontend/dist")));

// //   app.get("*", (req, res) => {
// //     res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
// //   });
// // }
 

// app.use(express.static(path.join(__dirname,"/frontend/dist")))

// app.get(/.*/,(req,res)=>{
//   res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"));
// }) 

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
//   connectDB();  
// });
 

import express from "express";
import session from "express-session";   
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import authRoutes from "./src/routes/auth.route.js";
import userRoutes from "./src/routes/user.route.js";
import chatRoutes from "./src/routes/chat.route.js";
import chatbotRoutes from "./src/routes/chatbot.route.js";
import { connectDB } from "./src/lib/db.js";
import { chatWithBot } from "./src/controllers/chatbot.controller.js";

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// 1. DATABASE CONNECTION FIRST 
connectDB();

// 2. SESSION MIDDLEWARE  
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",  // HTTPS on Render
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 1000 * 60 * 60 * 24 * 7  // 7 days
  }
}));

// 3. CORS FIXED for same-origin + credentials
app.use(cors({
  origin: "https://languagelearningplatform.onrender.com",
  credentials: true
}));

// 4. BODY PARSERS
app.use(express.json());
app.use(cookieParser());

// 5. API ROUTES BEFORE STATIC
app.post("/chatbot", chatWithBot);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/chatbot", chatbotRoutes);

// 6. STATIC FILES LAST (SPA catch-all)
app.use(express.static(path.join(__dirname,"/frontend/dist")))

app.get(/.*/,(req,res)=>{
  res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"));
}) 

// 7. START SERVER
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
