const express = require("express");
const pool = require("../database/db");

const router = express.Router();

// Create new forum post
router.post("/posts", async (req, res) => {
  const { title, content, user_id } = req.body;

  if (!title || !content || !user_id) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO posts (title, content, user_id) VALUES ($1, $2, $3) RETURNING *",
      [title, content, user_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

module.exports = router;
