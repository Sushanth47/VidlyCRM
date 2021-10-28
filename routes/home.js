const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.redirect("/crm/crm/dashboard");
});

module.exports = router;
