
import express from "express"
import {
    createOrg, getOrg, getOrgAthleteGender, getOrgComptationAthletes, getOrgId, getOrgIdAdmin, getOrgStatus, loginOrg, updateOrgStatus
} from "../../controllers/Organizations/organization.js"


const router = express.Router();

// GET
router.get('/org', getOrg);
router.get('/org/status', getOrgStatus);
router.get('/org/:token', getOrgId);
router.get('/org-athletes', getOrgAthleteGender)
router.get('/org/to/athletes', getOrgComptationAthletes)
router.get('/org/admin/id', getOrgIdAdmin)
//POST
router.post('/org', createOrg);
router.patch('/org/status-update/:id', updateOrgStatus);
router.post('/org/login', loginOrg);
export default router

// 1600