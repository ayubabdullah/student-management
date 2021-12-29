const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require('path');

const connectDB = require("./config/db");
const studentsRouter = require("./routes/student");
const errorHandler = require("./middlewares/errorHandler");

// Load env vars
dotenv.config();

// Connect to database
connectDB()
  .then(() => {
    const app = express();
    const PORT = process.env.PORT || 5000;
    const server = app.listen(PORT, () => {
      console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
      );
    });

    // Dev logging middleware
    if (process.env.NODE_ENV === "development") {
      app.use(morgan("dev"));
    }

    app.use(express.json());

    app.use(express.urlencoded({ extended: false }));

    app.use(cors());

    app.use("/students", studentsRouter);
    const __dirname = path.resolve();
    if (process.env.NODE_ENV === "production") {
      app.use(express.static(path.join(__dirname, "/frontend/build")));

      app.get("*", (req, res) => {
        res.sendFile(
          path.resolve(__dirname, "frontend", "build", "index.html")
        );
      });
    }
    app.use(errorHandler);
  })
  .catch((err) => console.error(err));
