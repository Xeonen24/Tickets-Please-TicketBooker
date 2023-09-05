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
app.use(cookieParser());
const errorHandler = require("./middleware/error");
const Routes = require("./routes/routes");
const AdminJs = require("admin-bro");
const AdminJsExpress = require("@admin-bro/express");
const AdminJsMongoose = require("@admin-bro/mongoose");

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

// Set up the express session store
const sessionStore = new MongoDBStore({
  uri: process.env.DATABASE,
  collection: "sessions",
});

// Catch errors
sessionStore.on("error", (error) => {
  console.log(error);
});

// Set up the express session middleware
app.use(
  session({
    secret: process.env.ADMIN_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
    store: sessionStore,
  })
);
AdminJs.registerAdapter(AdminJsMongoose);

const adminJs = new AdminJs({
  databases: [mongoose],
  rootPath: "/admin",
  logoutPath: "/admin/logout",
  loginPath: "/admin/login",
  branding: {
    companyName: "TicketsPlease?",
    logo: "",
    softwareBrothers: false,
  },
  resources: [
    {
      resource: USER,
      options: {
        parent: {
          name: "User Management",
          icon: "User",
        },
        properties: {
          _id: {
            isVisible: { list: false, filter: true, show: true, edit: false },
          },
          email: {
            isVisible: { list: true, filter: true, show: true, edit: false },
          },
          username: {
            isTitle: true,
          },
          createdAt: {
            isTitle: true,
          },
          tokens: {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          password: {
            isVisible: { list: false, filter: false, show: true, edit: true },
          },
          password2: {
            isVisible: { list: false, filter: false, show: true, edit: true },
          },
          isAdmin: {
            isVisible: { list: true, filter: true, show: true, edit: true },
          },
        },
      },
    },
    {
      resource: BOOKING,
      options: {
        parent: {
          name: "Bookings Management",
          icon: "InventoryManagement",
        },
        properties: {
          _id: {
            isVisible: { list: false, filter: true, show: true, edit: false },
          },
          selectedSeats: {
            isVisible: { list: false, filter: false, show: true, edit: false },
          },
          totalPrice: {
            isVisible: { list: true, filter: false, show: true, edit: false },
          },
          bookingItemTitle: {
            isVisible: { list: true, filter: true, show: true, edit: false },
          },
          bookingItemId: {
            isVisible: { list: false, filter: false, show: true, edit: false },
          },
          selectedTheatre: {
            isVisible: { list: false, filter: false, show: true, edit: false },
          },
          showTime: {
            isVisible: { list: false, filter: false, show: true, edit: true },
          },
          isPaid: {
            isVisible: { list: true, filter: true, show: true, edit: true },
          },
          user: {
            isTitle: true,
          },
          paymentId: {
            isVisible: { list: false, filter: false, show: true, edit: false },
          },
        },
      },
    },
  ],
  locale: {
    translations: {
      labels: {
        loginWelcome: "Admin Panel Login",
      },
      messages: {
        loginWelcome: "Please enter your administrative credentials",
      },
    },
  },
  dashboard: {
    component: AdminJs.bundle("./components/admin-dashboard-component.jsx"),
  },
});

const router = AdminJsExpress.buildAuthenticatedRouter(adminJs, {
  authenticate: async (email, password) => {
    if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
      return Promise.resolve(DEFAULT_ADMIN);
    }
    return null;
  },
  cookiePassword: process.env.ADMIN_COOKIE_PASSWORD,
  cookieName: process.env.ADMIN_COOKIE_NAME,
  sessionStore,
});

app.use(
  session({
    secret: process.env.ADMIN_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
  })
);

app.use(adminJs.options.rootPath, router);

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
    origin: function (origin, callback) {
      if (
        !origin ||
        origin === "http://localhost:3000" ||
        origin === "http://localhost:5000"
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    exposedHeaders: ["authorization"],
  })
);

app.use("/api", Routes);

app.use(errorHandler);

const port = 5000;
app.listen(port, () => {
  console.log(`App is running`);
});
