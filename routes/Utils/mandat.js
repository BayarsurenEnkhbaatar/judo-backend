// import express from "express";
// import { imageGet, imageUpload } from "../../controllers/Utils/utils.js";
// import multer, { memoryStorage } from 'multer';

// const router = express.Router();

// const storage = memoryStorage();
// const upload = multer({ storage });

// router.post('/utils/mandat', upload.single('image'), imageUpload);
// router.get('/utils/img-get', imageGet);

// export default router;

import mustache from "mustache";
import fs from "fs";

// Read the template file
const template = fs.readFileSync('template.html', 'utf8');

// Data to be passed to the template
const data = {
  title: 'Mustache.js Example',
  greeting: 'Hello',
  name: 'John',
};

// Render the template with data
const renderedHTML = mustache.render(template, data);

// Output the rendered HTML
console.log(renderedHTML);
