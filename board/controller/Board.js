const { Board } = require("../models");

module.exports = {
  Post: async (req, res) => {
    try {
      let { content } = req.body;
      let image = "/img/" + req.files.image[0].filename;
      console.log(req.files);
      const rows = await Board.create({
        content: content,
        image: image,
      });
      if (rows) return res.status(200).json({ result: rows });
    } catch (err) {
      console.log(err);
    }
  },
  Get: async (req, res) => {
    try {
      const rows = await Board.findAll();
      if (rows) return res.status(200).json({ result: rows });
    } catch (err) {
      console.log(err);
    }
  },
};
