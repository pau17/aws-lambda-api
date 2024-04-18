import express from 'express';
import { getPeople, postPeople } from '../api/amazonApi.js';

const router = express.Router();

router.post("/save/:id", postPeople);
router.get("/list", getPeople);

export default router; 
