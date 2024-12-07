const express = require("express");
const router = express.Router();
const validateApiKey = require("../validateApikey");
const adminController = require("../controllers/adminController");

router.use(validateApiKey);
router.post("/trains", adminController.addTrain);
router.get("/trains", adminController.getTrains);


module.exports = router;
