const dotenv = require("dotenv");
const express = require("express");
const db = require("./database");
const hbs = require("hbs");
const path = require("path");
const { rootRoutes } = require("./routes/routes");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");

dotenv.config({ path: path.join(__dirname, "./environment/.env") });
const server = express();
const publcpath = path.join(__dirname, "./public");
const viewspath = path.join(__dirname, "./template/views");
const partialpath = path.join(__dirname, "./template/partials");

server.set("view engine", "hbs");
server.set("views", viewspath);
hbs.registerPartials(partialpath);

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cookieParser());
server.use(flash());

server.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

server.use(express.static(publcpath));

// Middleware to set no-cache headers for sensitive routes
server.use((req, res, next) => {
  res.header(
    "Cache-Control",
    "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
  );
  next();
});

server.use(rootRoutes);

db.connect().then(() => {
  server.listen(process.env.PORT);
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
