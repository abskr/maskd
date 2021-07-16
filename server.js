import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import passport from "passport"
import listEndpoints from "express-list-endpoints"
import cors from "cors"
import {} from "./config/passport.js"

import users from "./routes/api/users.js"
import posts from "./routes/api/posts.js"

const app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// CORS Middleware
app.use(cors())


// Connect to MongoDB
mongoose
  .connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true }
  )
  .then(() => {
    console.log(listEndpoints(app))
    console.log("MongoDB successfully connected")
  })
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
// Passport config

// Routes
app.use("/api/posts", posts);
app.use("/api/users", users);

const port = process.env.PORT || 5005;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
