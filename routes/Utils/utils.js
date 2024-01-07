import express from "express";
import { imageGet, imageUpload, Jin_Protocol_Pdf, pdfConvert } from "../../controllers/Utils/utils.js";
import multer, { memoryStorage } from 'multer';


const router = express.Router();

const storage = memoryStorage();
const upload = multer({ storage });

router.post('/utils/img-upload', upload.single('image'), imageUpload);
router.get('/utils/img-get', imageGet);
router.post('/utils/pdf', pdfConvert);
router.post('/utils/jin/pdf', Jin_Protocol_Pdf);

export default router;
