
import express from "express"
import { MatchCompGet, MatchCreate, MatchRepechage, MatchUpdate, MatchWinner, MatchWinnerRepechage, MatchWunnerFinal } from "../../controllers/Matches/matchesController.js";

const router = express.Router();

router.post('/matches/create', MatchCreate);
router.get('/matches/draw', MatchCompGet);

router.patch('/matches/draw/update', MatchUpdate);
router.patch('/matches/winner', MatchWinner);
router.patch('/matches/repechage/update', MatchRepechage);
router.patch('/matches/winner-repechage', MatchWinnerRepechage);
router.patch('/matches/winner-final', MatchWunnerFinal);

export default router
