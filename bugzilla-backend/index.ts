const connectToMongo = require("../bugzilla-backend/src/Database/indexDB");
connectToMongo();
let cors = require("cors");


const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.json());

app.use("/api/user", require("./src/Routes/UserRoutes"));
app.use("/api/project", require("./src/Routes/ProjectRoutes"));
app.use("/api/bug", require("./src/Routes/BugRoutes"));


app.get("/", (req: any, res: any) => {
  res.send("Hello World, This is backend");
});

app.listen(process.env.PORT || port, () => {
  console.log(`BugZilla app is listening on port ${port}`);
});
