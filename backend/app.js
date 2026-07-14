const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const resumeRoutes =
    require(
        "./routes/resumeRoutes"
    );

const jobRoutes =
    require(
        "./routes/jobRoutes"
    );
const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "CareerSync API Running",
    });
});

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use(
    "/api/resume",
    resumeRoutes
);

app.use(
    "/api/jobs",
    jobRoutes
);
module.exports = app;