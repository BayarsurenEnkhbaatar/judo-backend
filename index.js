import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import CategoryRoute from "./routes/Category/category.js"
import OrganizationsRoute from "./routes/Organizations/organization.js"
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(CategoryRoute);
app.use(OrganizationsRoute);

app.listen(process.env.APP_PORT, () => {
    console.log('Server up and running ... ' + process.env.APP_PORT)
})