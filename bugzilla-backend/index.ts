const connectToMongo = require("../bugzilla-backend/src/Database/indexDB");
connectToMongo();
let cors = require("cors");
const bodyParser = require("body-parser");
const port = 5000;
require("dotenv").config();
const express = require("express");
const cloudinary = require("cloudinary").v2;
const Multer = require("multer");
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.json());

cloudinary.config({
  cloud_name: "dngs5wqhy",
  api_key: "887592147572224",
  api_secret: "MnreKvPuQYnI-rH5YAbrdaV8M0Q",
});
async function handleUpload(file: any) {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return res;
}
const storage = new Multer.memoryStorage();
const upload = Multer({
  storage,
});

app.post("/upload", upload.single("my_file"), async (req: any, res: any) => {
  try {
    const b64 = Buffer.from(req.file?.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    const cldRes = await handleUpload(dataURI);
    res.json(cldRes);
  } catch (error: any) {
    console.log(error);
    res.send({
      message: error.message,
    });
  }
});
app.use("/api/user", require("./src/Routes/UserRoutes"));
app.use("/api/project", require("./src/Routes/ProjectRoutes"));
app.use("/api/bug", require("./src/Routes/BugRoutes"));

app.get("/", (req: any, res: any) => {
  res.send("Hello World, This is backend");
});

app.listen(process.env.PORT || port, () => {
  console.log(`BugZilla app is listening on port ${port}`);
});
