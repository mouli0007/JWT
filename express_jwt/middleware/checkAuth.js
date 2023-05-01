const JWT = require("jsonwebtoken");

const check_auth = async (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(400).json({
      errors: [
        {
          msg: "No token Found !",
        },
      ],
    });
  }

  // Validating the token !

  // It Validates the credetntials and provides u the payload !

  try {
    let user = await JWT.verify(token, "Our secret token !");
    req.user = user.email;
    next();
  } catch (err) {
    return res.status(400).json({
      errors: [
        {
          msg: "Invalid Token ",
        },
      ],
    });
  }
};

module.exports.Authorize = check_auth;
