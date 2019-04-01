
const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const exphbs = require("express-handlebars");
const settingsParser = require("./helpers/settings.parser");
const dotEnv = require("dotenv");
const configProvider = require("./helpers/config.provider");

// middlewares
const authMiddleware = require("./middlewares/auth.middleware");
const headerMiddleware = require("./middlewares/header.middleware");

// Db
const database = require("./db/database");
const appConfig = require("./configs/app.config");
const app = express();

const CONFIG_PATH = settingsParser.getVariable(process.env.CONFIG_PATH, "env/.env");
const pathToEnv = path.resolve(process.cwd(), CONFIG_PATH);
dotEnv.config({ path: pathToEnv });

appConfig.external = settingsParser.parse(process.env);
configProvider.store(appConfig.external);
database
    .clearSchemes()
    .configureSchemes()
    .connect(appConfig.dbName);

// Routes
const index = require("./routes/index.route");
const users = require("./routes/users.route");
const stripe = require("./routes/stripe.route");
const auth = require("./routes/auth.route");
const products = require("./routes/products.route");
const posts = require("./routes/posts.route");
const sessions = require("./routes/sessions.route");

// Handlers
const userHandler = require("./handlers/user/user.handler");

// view engine setup
app.engine("handlebars", exphbs({
    defaultLayout: "main", 
    layoutsDir: path.resolve(__dirname, "views/layouts")
}));
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use(logger("dev"));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));

app.use(cookieParser());
app.use(session({
    secret: appConfig.session.secret,
    key: appConfig.session.key,
    cookie: appConfig.session.cookie,
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: database.connection
    })
}));

app.get("*.js", function (req, res, next) {
    req.url = req.url + ".gz";
    res.set("Content-Encoding", "gzip");
    res.set("Content-Type", "text/javascript");
    next();
});
app.use(express.static(path.join(__dirname, "public")));
app.use("/js", express.static(path.join(__dirname, "public", "static", "js")));
app.use("/css", express.static(path.join(__dirname, "public", "static", "css")));

// app.use(headerMiddleware);

// app.use((request, response) => {
//     request.session.number = request.session.number + 1 || 1;
//     response.send("Visitors: " + request.session.number); 
// });
// app.use("/", index);

app.use("/api/auth", auth)

app.use("/api/stripe", stripe);
app.use("/api/users", users);
app.use("/api/products", products);
app.use("/api/posts", posts);
app.use("/api/sessions", sessions);

app.use("/user", authMiddleware, userHandler);

app.get("*", (request, response) => 
    response.sendFile(path.join(__dirname, "public", "build", "site-app", "index.html"))
);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;