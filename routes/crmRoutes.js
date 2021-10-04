const express = require("express");
const router = express.Router();
const {
  getDashboardPage,
  getDashboard,
} = require("../controllers/crmController");
router.get("/dashboard", getDashboardPage);

router.get("/dashboard/data", getDashboard);

module.exports = router;
