const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");
const cors = require("cors");
const { sequelize } = require("./models");
const Router = require("./routes");

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("연결됨");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(cors());
app.use("/img", express.static("./uploads"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/users", Router.UsersRoute);
app.use("/auth", Router.EmailRoute);
app.use("/board", Router.BoardRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
