const express = require('express');
const router = express.Router();
const osController = require("../controllers/osController");

router.get('/os', osController.getOsInfo);
router.get('/file', osController.getFile);

module.exports = router;