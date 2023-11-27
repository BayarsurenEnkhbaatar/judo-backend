
import express from "express"
import { ResultGetComp } from "../../controllers/Result/resultController.js";

const router = express.Router();

router.get('/results/winner', ResultGetComp);

export default router