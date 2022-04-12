const jwt = require("jsonwebtoken");
const { createToken } = require("../utils/jwt");
require("dotenv").config();
const secretKey = "" + process.env.ACCESS_KEY;
const { User } = require("../models");

const createToken = (payload) => {
  console.log(createToken);
  const token = jwt.sign({ name: payload.toString() }, secretKey, {
    algorithm: "HS256",
    expiresIn: "30m",
  });
  return token;
};

module.exports = async (req, res, next) => {
  try {
    const token = req.get("x_auth");
    const decodedToken = jwt.verify(token, secretKey);
    const { id } = decodedToken;
    const rows = await User.findOne({ id: id });
    if (rows) {
      return res.status(200).json({ result: rows });
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};
