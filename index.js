require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const { connectToMongo } = require("./connection");
const { checkForAuthenticationCookie } = require('./middlewares/auth.middleware')
const staticRoute = require("./routes/static.route");
const authRoute = require("./routes/auth.route");
const blogRoute = require("./routes/blog.route");
const userRoute = require("./routes/user.route");

const app = express();
const PORT = process.env.PORT || 8000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
connectToMongo(process.env.MONGO_URL).then(()=> console.log('mongoDB connected'));

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie('token'));
app.use(express.static(path.resolve('./public')));

app.use("/", staticRoute);
app.use("/auth", authRoute);
app.use("/blog", blogRoute);
app.use("/profile", userRoute);

app.listen(PORT, () => console.log(`server is running on ${PORT}`));
