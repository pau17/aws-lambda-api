import express from 'express';
import amazonApi from '../api/amazonApi';
import { getPeople, postPeople } from '../api/amazonApi';

const router = express.Router();

router.post("/save/:id", postPeople);
router.get("/list", getPeople);

module.exports = router;