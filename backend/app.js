const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const USER = require("./models/user");
const BOOKING = require("./models/booking");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error");
const Routes = require("./routes/routes");

const DEFAULT_ADMIN = {
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD,
};

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

const sessionStore = new MongoDBStore({
  uri: process.env.DATABASE,
  collection: "sessions",
});

sessionStore.on("error", (error) => {
  console.log(error);
});

app.use(
  session({
    secret: process.env.ADMIN_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
    store: sessionStore,
  })
);

app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "100mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "100mb",
    extended: true,
  })
);

app.use(
  cors({
    origin: ["https://tickets-please-ticket-booker-frontend.vercel.app","http://localhost:3000","https://tickets-please-ticket-booker.vercel.app"],
    credentials: true,
    exposedHeaders: ['Authorization'],
  })
);

app.use("/api", Routes);

app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
