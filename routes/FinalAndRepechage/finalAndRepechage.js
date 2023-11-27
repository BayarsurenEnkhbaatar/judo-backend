
import express from "express"
import { getRepechageAndFinal, patchRepechange } from "../../controllers/FinalAndRepechage/repeAndFinalController.js";

const router = express.Router();

router.get('/repechage/final', getRepechageAndFinal);
router.patch('/repechage/lose', patchRepechange);

export default router