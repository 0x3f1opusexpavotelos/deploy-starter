const express = require("express");

const router = express.Router();

router.get("/list", (req, res) => res.json({ message: "prodcut list data" }));

module.exports = router;
