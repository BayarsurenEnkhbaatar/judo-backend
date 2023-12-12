
import express from "express"
import { AdminCompAthlete, compAllList, compAthleteCatgoryDelete, compFindId, compToCategoryAthletesAndOrg, Comp_Medal_Chanar, Comp_Stattistik, Comp_to_Athletes, createAthleteToComptation, createComptation, getCompAll, Jin_Control_Update } from "../../controllers/Comptation/comptationController.js";

const router = express.Router();

router.get('/comp', getCompAll);
router.get('/comp/all', compAllList);
router.get('/comp/findId', compFindId);
router.get('/comp-to-athlete-category', compToCategoryAthletesAndOrg);
router.get('/comp-admin-athletes', AdminCompAthlete);
router.get('/comp-to-athletes', Comp_to_Athletes);
router.get('/comp-statistic', Comp_Stattistik);
router.get('/comp-medali-chanar', Comp_Medal_Chanar);

router.delete('/comp-to-athlete-category', compAthleteCatgoryDelete);
router.patch('/comp-to-athlete/jin-control', Jin_Control_Update);

//POST
router.post('/comp-to-athlete', createAthleteToComptation);
router.post('/comp', createComptation);
export default router
