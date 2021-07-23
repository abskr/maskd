import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import passport from "passport"
import listEndpoints from "express-list-endpoints"
// import geoip from 'geoip-lite';
// import requestIp from "request-ip"
import cors from "cors"
import {} from "./config/passport.js"

import users from "./routes/api/users.js"
import posts from "./routes/api/posts.js"
import {
  badRequest,
  notFound,
  unauthorized,
  genericError,
} from './errorHandlers.js';

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

// Routes
// app.get('/testroute', (req, res) => {
//   const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress; 
//   console.log(ip); // ip address of the user
//   console.log(geoip.lookup(ip)); // location of the user
//   res.json({ip})
// });
app.use("/api/posts", posts);
app.use("/api/users", users);

// error handlers
app.use(badRequest);
app.use(notFound);
app.use(unauthorized);
app.use(genericError);

const port = process.env.PORT || 5005;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
