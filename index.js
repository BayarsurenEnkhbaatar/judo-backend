import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import CategoryRoute from "./routes/Category/category.js"
import OrganizationsRoute from "./routes/Organizations/organization.js"
import AthleteRoute from "./routes/Athletes/athletes.js"
import JinRoute from "./routes/Jin/jin.js"
import ComptationRoute from "./routes/Comptation/comptation.js"
import MatchsRoute from "./routes/Matches/match.js"
import ResultRoute from "./routes/Result/result.js"
import GroupRoute from "./routes/Groups/groups.js"
import FinalAndRepechageRoute from "./routes/FinalAndRepechage/finalAndRepechage.js"
import ComptoOrgRoute from "./routes/Organizations/comp_to_org.js"
import UtilsRoute from "./routes/Utils/utils.js"

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(CategoryRoute);
app.use(OrganizationsRoute);
app.use(AthleteRoute);
app.use(JinRoute);
app.use(ComptationRoute);
app.use(MatchsRoute);
app.use(ResultRoute);
app.use(GroupRoute);
app.use(FinalAndRepechageRoute);
app.use(ComptoOrgRoute);
app.use(UtilsRoute);

const port = 5000
app.listen(port, () => {
    console.log(process.env.DATABASE_URL);
    console.log('Server up and running ... ' + port)
});