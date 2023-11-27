
import express from "express"
import { CompToOrg, CompToOrgCreate, createComp_to_org, getComp_to_org, OrgAthletesComp, OrgComp, OrgCompStatus, OrgCompToken } from "../../controllers/Organizations/comp_to_org.js.js";

const router = express.Router();

// GET
router.post('/comp-to-org/create', createComp_to_org);
router.get('/comp-to-org/get', getComp_to_org);
router.get('/comp-to-org/admin', OrgAthletesComp);
router.get('/comp-to-org/register-modal', CompToOrg);
router.get('/comp-to-org', OrgComp);
router.get('/comp-to-org/token', OrgCompToken);

router.post('/comp-to-org/register-modal', CompToOrgCreate);

router.patch('/comp-to-org', OrgCompStatus);

export default router

// 1600