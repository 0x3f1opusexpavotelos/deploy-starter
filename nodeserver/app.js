const express = require("express");
const rateLimit = require("express-rate-limit");
const fs = require("fs");
const https = require("https");
const jwt = require("jsonwebtoken");
// const cluster = require("os");

const app = express();
const port = 3000;

// content-type header detection and parse
// parse application/x-www-form-urlencoed
app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyParser.json())


const limiter = rateLimit({
  windowsMs: 60 * 1000, // 1 min
  max: 10, // 10 req/min
  message: "too frequent request, please retry after 1 minute ",
});

const userService = require("./services/user-service");
const productService = require("./services/product-service");
const orderService = require("./services/order-service");




app.get("/", (req, res) => {
  res.writeHead(200, {
    "content-type": "text/plain",
  });
  res.end("single thread app");
  // res.status(200).type("text").send("single thread app");
});
app.get("__magic_link", (req, res) => {
  // const secret = "mock-secrets"
  // const token = jwt.sign({
  //   ''
  // }, secret)
});

app.use("/users", limiter, userService);
app.use("/products", productService);
app.use("/orders", orderService);

app.use((req, res) => {
  res.status(404).send("404 - not found");
});

const secretOpts = {
  key: fs.readFileSync("cert-mkcert/key.pem"),
  cert: fs.readFileSync("cert-mkcert/cert.pem"),
};

const serverOpts = Object.assign({}, secretOpts);

const server = https.createServer(serverOpts, app);

server.listen(port, () => {
  console.log(`api gatway listening at https://localhost:${port}`);
});
