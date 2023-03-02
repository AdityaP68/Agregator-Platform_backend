import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import createError from "http-errors";
import AuthRoutes from "./routes/auth.route.js"
import UserRoutes from "./routes/user.route.js"
import middleware from "./middlewares/middleware.js";
import './helpers/_init_mongodb.js'

const app = express();
const { json, urlencoded } = bodyParser;

app.use(morgan("dev"));

app.use(json());
app.use(urlencoded({ extended: true }));

// home-route
app.get("/",middleware.verifyAccessToken, async (req, res, next) => {
  console.log(req.headers['authorization'])
  res.send("<h1>HELLO</h1>");
});

// auth-route
app.use('/auth', AuthRoutes)
app.use('/user', UserRoutes)

// all-catch-route
app.use(async (req, res, next) => {
  // const error = new Error("Not Found");
  // error.status = 404;
  // next(error);
  next(createError.NotFound('This route does not exists'))
});

// error handler
app.use(async (err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

export default app;
