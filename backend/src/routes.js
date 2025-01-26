const routes = require("./routes/index");
const path = require("path");
const HttpStatus = require("./constants/httpStatus");

function serverRoutes(app) {
  //! root route
  app.get("^/$|/index(.html)?", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "static", "html", "index.html"));
  });

  //! other routes
  app.use("/api/auth", routes.authRoutes);
  app.use("/api/user", routes.userRoutes);
  app.use("/api/message", routes.messageRoutes);

  //! file size too large error handling
  app.use((err, req, res, next) => {
    if (
      err instanceof SyntaxError &&
      err.status === HttpStatus.HTTP_400_BAD_REQUEST &&
      "body" in err
    ) {
      res
        .status(HttpStatus.HTTP_400_BAD_REQUEST)
        .json({ error: "Invalid JSON payload" });
    } else if (err.type === "entity.too.large") {
      res
        .status(HttpStatus.HTTP_413_REQUEST_ENTITY_TOO_LARGE)
        .json({ error: "File is too large" });
    } else {
      next();
    }
  });

  //! 404 error handling
  app.all("/*", (req, res) => {
    res.status(HttpStatus.HTTP_404_NOT_FOUND);
    if (req.accepts("html")) {
      res.sendFile(path.join(__dirname, "..", "static", "html", "404.html"));
    } else if (req.accepts("json")) {
      res.json({ error: "404 Not Found" });
    } else {
      res.type("txt").send("404 Not Found");
    }
  });
}

module.exports = serverRoutes;
