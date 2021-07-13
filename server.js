const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const listEndpoints = require("express-list-endpoints")

const users = require("./routes/api/users");
const posts = require("./routes/api/posts")

const app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());


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
require("./config/passport")(passport);

// Routes
app.use("/api/posts", posts);
app.use("/api/users", users);

const port = process.env.PORT || 5005;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
