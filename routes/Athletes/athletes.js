
import express from "express"
import { AthleteDelete, AthletetoComp, createAthlete, getAthleteExpired, getAthleteOrg, getAthleteStatus, OrgExpiredApproved, updateAthleteStatus } from "../../controllers/Athletes/athlete.js";

const router = express.Router();

router.get('/athlete/status-at', getAthleteStatus);
router.get('/athlete/athlete-to-comptation', AthletetoComp);
router.get('/athlete', getAthleteOrg);
router.get('/athlete-expired', getAthleteExpired);

router.post('/athlete', createAthlete);
router.patch('/athlete/status/:id', updateAthleteStatus);
router.patch('/athlete/expired-approve', OrgExpiredApproved);

router.get('/athlete/delete', AthleteDelete);
export default router