const express = require("express");
const path = require("path");
const dotenv = require("dotenv").config();
const passport = require("passport");

// importing our database setup
const connectDB = require("./config/dbConfig");
const port = process.env.PORT || 4000;
const app =express();

const Signup = require("./models/userModel")
// importing helloRoutes which we exported in hello pug
const helloRoutes = require("./controllers/helloRoutes")
const homeRoutes = require("./controllers/homeRoutes")
const employeeRoutes = require("./controllers/employeeRoutes")
const userRoutes = require("./controllers/userRoutes")
const dashRoutes = require("./controllers/dashRoutes")


// this is importing the express session an using it directly to pass parameters.
const expressSession = require("express-session")({
    secret: "secret", 
    resave: false,
    saveUnitialized: false
})
// const session = expressSession({}) 

app.use(express.urlencoded({extended: false}));
app.use(express.json());

// calling the configuration to run.
connectDB();

// setting up line using the new engine
app.engine("pug", require("pug").__express);
app.set("view engine","pug");
app.set("views", path.join(__dirname, "views"));

app.use(expressSession);

app.use(passport.initialize());
app.use(passport.session());

passport.use(Signup.createStrategy());
passport.serializeUser(Signup.serializeUser());
passport.deserializeUser(Signup.deserializeUser());


//setting up directory for static files
// __dirname means starting from the root folder called public
app.use(express.static(path.join(__dirname, "public")))

// using imported routes// line 16 should be above line 19(lines might keep changing but you get)

app.use("/api", helloRoutes)
app.use("/api", homeRoutes)
app.use("/api", employeeRoutes)
app.use("/api", userRoutes)
app.use("/api", dashRoutes)





// running the server on a specific port(3000)
// this should always be the last line in the server file
app.listen(port, () =>console.log(`server is running at http://localhost:${port}`));
// this is a call back

