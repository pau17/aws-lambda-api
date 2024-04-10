const express = require("express");
const amazonApi = require("../api/amazonApi");


const router = express.Router();

router.post("/save/:id", amazonApi.postPeople);
router.get("/list", amazonApi.getPeople);

module.exports = router;