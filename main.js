const express = require("express");
const morgan = require("morgan");
const session = require("express-session");
const logger = require("./src/utils/logger");
const bodyParser = require("body-parser");

require("dotenv").config();
const port = 3000;

const app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/views"));
app.use(morgan("tiny"));
app.use(express.json());
app.use(
  session({
    secret: process.env.AUTH_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: session.MemoryStore(),
  })
);
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", require("./src/routes/session"));
app.use("/account", require("./src/routes/account"));
app.use("/ta-administration", require("./src/routes/ta_administration"));
app.use("/ta-management", require("./src/routes/ta_management"));
app.use("/ta-rating", require("./src/routes/ta_rating"));
app.use("/sysop-tasks", require("./src/routes/sysop_tasks"));

app.listen(port, () => {
  logger.info({
    ctx: "server.core",
    info: `ta-management server listening on port ${port}`,
  });
});
