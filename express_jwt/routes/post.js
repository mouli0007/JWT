const express = require("express");
const router = express.Router();

const { Authorize } = require("../middleware/checkAuth");

// Creating a public route !

router.get("/public", (req, res) => {
  const { pub, private } = require("../db");

  return res.status(200).json(pub);
});

// Authorizing the private post !

// Middleware function to be executed befoe the req and res

router.get("/private", Authorize, (req, res) => {
  return res.status(200).json(private);
});

module.exports = router;
