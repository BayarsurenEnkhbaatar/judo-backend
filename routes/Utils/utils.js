import express from "express";
import { imageGet, imageUpload, pdfConvert } from "../../controllers/Utils/utils.js";
import multer, { memoryStorage } from 'multer';


const router = express.Router();

const storage = memoryStorage();
const upload = multer({ storage });

router.post('/utils/img-upload', upload.single('image'), imageUpload);
router.get('/utils/img-get', imageGet);
router.post('/utils/pdf', pdfConvert);

export default router;
