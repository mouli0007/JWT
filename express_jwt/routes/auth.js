const express = require("express");
const router = express.Router();
const { users } = require("../db");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

// Express Validator !
const { check, validationResult } = require("express-validator");

router.post(
  "/signup",
  [
    // Making the checks

    check("email", "Please Provide a Valid Email").isEmail,
    check("password", "Please Provide a valid password !").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const { email, password } = req.body;

    const errors = validationResult(req);

    // Validation for the users inputs !
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    // Validate for thes user is its already exist!

    let user = users.find((user) => {
      return user.email === email;
    });

    if (user) {
      return (
        res.status(400),
        json({
          errors: [
            {
              msg: "Email  Already Exist ",
            },
          ],
        })
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Pushing our credentials to DB
    users.push({
      email,
      password: hashedPassword,
    });

    const token = await JWT.sign(
      {
        email,
        password,
      },
      "ijiwdjwijdiwjdijdiwjidlpondzvvus",
      {
        expiresIn: 3600,
      }
    );
    return res.json({ token });
  }
);

// Authentication with JWT !

router.post("/login", async (req, res) => {
  const { password, email } = req.body;

  let user = users.find((user) => user.email === email);

  // Comparing the password with hashed password !
  let isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(404).json({
      errors: [
        {
          msg: "Invalid Credentials !",
        },
      ],
    });
  }

  const token = await JWT.sign(
    {
      email,
    },
    "ijiwdjwijdiwjdijdiwjidlpondzvvus",
    {
      expiresIn: 3600,
    }
  );

  return res.status(200).json({ token });
});

router.get("/all", (req, res) => {
  res.status(200).json(users);
});

module.exports = router;
