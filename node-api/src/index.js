require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.HOST;
const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log(`Node.js API listening at http://localhost:${port}`);
});
