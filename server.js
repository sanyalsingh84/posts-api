require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const postsRouter = require("./routes/posts");
const pool = require("./database/db");

const app = express();
app.use(bodyParser.json());
const PORT = process.env.PORT || 5000;

// Routes
app.use("/api", postsRouter);

app.get("/api/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      status: "Database connected ✅",
      time: result.rows[0].now,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ status: "Database connection failed ❌", error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
