const express = require("express");
const morgan = require("morgan");
const session = require("express-session");
const logger = require("./src/utils/logger");

require('dotenv').config()
const port = 3000;

const app = express();

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

app.use("/", require("./src/routes/session"));
app.use("/account", require("./src/routes/account"));

app.listen(port, () => {
  logger.info({
    ctx: "server.core",
    info: `ta-management server listening on port ${port}`,
  });
});
