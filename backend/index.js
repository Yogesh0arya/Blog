import express from "express";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";
import commentRouter from "./routes/comment.route.js";
import webhookRouter from "./routes/webhook.route.js";
import connectDB from "./lib/connectDB.js";
import { clerkMiddleware, requireAuth } from "@clerk/express";
import cors from "cors";

const app = express();

app.use(cors(process.env.CLIENT_URL));

// body-parser not json
// to prevent conflict with json and body-parser, moved webhook on top
app.use("/webhooks", webhookRouter);

app.use(clerkMiddleware());

// middleware
app.use(express.json());

// imagekit auth middleware
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// test
// app.get("/auth-state", (req, res) => {
//   const authState = req.auth;
//   res.json(authState);
// });

// app.get("/protect", (req, res) => {
//   const { userId } = req.auth;
//   if (!userId) {
//     return res.status(401).json("Not authenticated");
//   }
//   res.status(200).json("content");
// });

// Redirect to homepage, cannot access protect2 without auth
// app.get("/protect2", requireAuth(), (req, res) => {
//   const { userId } = req.auth;
//   if (!userId) {
//     return res.status(401).json("Not authenticated");
//   }
//   res.status(200).json("content");
// });

app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);

// error handling
// no more try catch
app.use((error, req, res, next) => {
  res.status(error.status || 500);

  res.json({
    message: error.message || "Something went wrong!",
    status: error.status,
    stack: error.stack,
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  connectDB();
  console.log("Server is running!");
});

// import express from "express";

// const app = express();

// app.get("/test", (req, res) => {
//   res.status(200).send("it works");
// });

// app.listen(3000, () => {
//   console.log("server is running");
// });
