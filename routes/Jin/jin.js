
import express from "express"
import { createJin, getJinId } from "../../controllers/Jin/jin.js";

const router = express.Router();

router.get('/jin/:id', getJinId);
router.post('/jin', createJin);

export default router