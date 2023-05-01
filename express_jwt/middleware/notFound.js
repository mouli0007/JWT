const notfound = (req, res) => {
  res.status(404).send("404 Page not Found !");
  return;
};

module.exports = notfound;
