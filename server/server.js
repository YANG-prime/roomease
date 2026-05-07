const express = require("express");

const cors = require("cors");

require("dotenv").config();

const connectDB =
  require("./config/db");

const authRoutes =
  require("./routes/authRoutes");

const userRoutes =
  require("./routes/userRoutes");

const groupRoutes =
  require("./routes/groupRoutes");

const choreRoutes =
  require("./routes/choreRoutes");

const billRoutes =
  require("./routes/billRoutes");

const potMoneyRoutes =
  require("./routes/potMoneyRoutes");

const app = express();

connectDB();

app.use(cors());

app.use(express.json());

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/users",
  userRoutes
);

app.use(
  "/api/groups",
  groupRoutes
);

app.use(
  "/api/chores",
  choreRoutes
);

app.use(
  "/api/bills",
  billRoutes
);

app.use(
  "/api/pot-money",
  potMoneyRoutes
);

app.listen(5000, () => {

  console.log(
    "Server running on port 5000"
  );

});