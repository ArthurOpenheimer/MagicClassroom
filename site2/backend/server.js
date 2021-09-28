"use strict";

const authRoutes = require("./auth/auth.routes");
const express = require("express");

const app = express();
const router = express.Router();

app.listen(3000, () => console.log("Server running on port 3000"));
