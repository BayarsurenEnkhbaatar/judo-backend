
import express from "express"
import {
    createOrg, getOrg
} from "../../controllers/Organizations/organization.js"


const router = express.Router();

router.post('/org', createOrg);
router.get('/org', getOrg)

export default router