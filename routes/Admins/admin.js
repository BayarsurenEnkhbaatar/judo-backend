
import express from "express"
import { AdminCreate, AdminGet, AdminLogin } from "../../controllers/Admins/adminController.js";

const router = express.Router();

router.get('/admin', AdminGet);
router.post('/admin/create', AdminCreate);
router.post('/admin/login', AdminLogin);

export default router