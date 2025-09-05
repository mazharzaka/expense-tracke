const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db.config.js");
const userRoutes = require("./src/routes/User.route.js");

const cors = require("cors");
const passport = require("passport");
const { default: mongoose } = require("mongoose");
const MongoStore = require("connect-mongo");
const session = require("express-session");
dotenv.config();
connectDB();

const app = express();

app.use(
  session({
    secret: process.env.SECRET || "fallbackSecret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use("/api/auth", userRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
