const express = require("express");
const app = express();
app.use(express.json());

const auth = require("./routes/auth");
const posts = require("./routes/post");
const NotFound = require("./middleware/notFound");
app.use("/auth", auth);
app.use("/posts", posts);

app.get("/", (req, res) => {
  return res.status(200).send("Welcom to home page");
});

app.use(NotFound);

app.listen(3000, () => {
  console.log("Server is Listening to the port 3000...");
});
