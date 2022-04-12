const express = require("express");
const bcrypt = require("bcrypt");
const { createToken, creatRefreshToken } = require("../utils/jwt");
const { Users } = require("../models");
const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    let { id, passwd, email } = req.body;
    const hash = await bcrypt.hash(passwd, 12);
    const rows = await Users.create({
      id: id,
      passwd: hash,
      email: email,
    });
    if (rows) return res.status(200).json({ result: rows });
  } catch (err) {
    console.log(err);
  }
});
router.get("/list", async (req, res) => {
  try {
    const rows = await Users.findAll();
    if (rows) return res.status(200).json({ result: rows });
    else throw console.log(error);
  } catch (err) {
    console.log(err);
  }
});
router.post("/confirm", async (req, res) => {
  try {
    const { id } = req.body;
    const rows = await Users.findOne({
      where: { id: id },
    });
    if (rows) return res.status(200).json({ result: rows });
    else {
      res.send("1");
    }
  } catch (err) {
    console.log(err);
  }
});
router.post("/delete", async (req, res) => {
  try {
    const { idx } = req.body;
    const rows = await Users.destroy({
      where: { idx: idx },
    });
    if (rows) return res.status(200).json({ result: rows });
    else throw console.log(error);
  } catch (err) {
    console.log(err);
  }
});
router.post("/login", async (req, res) => {
  try {
    const { id, passwd } = req.body;
    // let salt = bcrypt.genSaltSync(12);
    // const hash = await bcrypt.hash(passwd, salt);
    const user = await Users.findOne({
      where: { id: id },
    });
    console.log("rows", passwd);
    const compare = await bcrypt.compare(passwd, user.passwd);
    if (compare == true) {
      const token = createToken(Users.id);
      const retoken = creatRefreshToken(Users.id);
      return res.send([token, retoken]);
    } else {
      throw res.send(404);
    }
  } catch (err) {
    console.log(err);
  }
});
router.post("/one", async (req, res) => {
  try {
    const { id } = req.body;
    const rows = await Users.findOne({
      where: {
        id: id,
      },
    });
    if (rows) return res.status(200).json({ result: rows });
    else throw console.log(error);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
