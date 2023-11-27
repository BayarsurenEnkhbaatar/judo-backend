
import express from "express"
import { createGroup, getGroupComp } from "../../controllers/Groups/groupController.js";

const router = express.Router();

router.get('/groups', getGroupComp);
router.post('/groups', createGroup);

export default router