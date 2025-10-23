import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connection from "./config/db.js";

import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js";
import { app, server } from "./SocketIO/server.js";
import path from "path";

dotenv.config();



// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://whatsapp-chat-sandy.vercel.app", // ✅ your frontend URL
    credentials: true, // ✅ allow cookies/tokens
    methods: ["GET", "POST", "PUT", "DELETE"],
    
  })
);


// ✅ Correct CORS Setup

const PORT = process.env.PORT || 3001;


// ✅ Routes
app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);

// ✅ Production Build Serve
// if (process.env.NODE_ENV === "production") {
//   const __dirname = path.resolve();
//   app.use(express.static("./Frontend/dist"));
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "./Frontend/dist", "index.html"));
//   });
// }




server.listen(PORT, async () => {
    try {
        await connection;
        console.log("✅ MongoDB Successfully Connected");
    } catch (error) {
        console.log("❌ Oops! MongoDB not connected");
        console.error(error);
    }

    console.log(`🚀 Server is running on port ${PORT}`);
});
