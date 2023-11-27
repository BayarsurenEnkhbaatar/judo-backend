
import express from "express"
import { AthletetoComp, createAthlete, getAthleteOrg, getAthleteStatus, updateAthleteStatus } from "../../controllers/Athletes/athlete.js";

const router = express.Router();

router.get('/athlete/status-at', getAthleteStatus);
router.get('/athlete/athlete-to-comptation', AthletetoComp);
router.get('/athlete', getAthleteOrg);

router.post('/athlete', createAthlete);
router.patch('/athlete/status/:id', updateAthleteStatus);

export default router