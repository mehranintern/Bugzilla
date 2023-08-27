import express from "express";
import {
  postItem,
  getItem,
  deleteItem,
  putItem,
} from "../Controllers/BugController";
import { getDeveloperORqa, getQA } from "../Middleware/Auth";

const router = express.Router();

router.post("/postItem",getQA, postItem);

router.get("/gettItem",getDeveloperORqa, getItem);

router.delete("/deleteItem",getQA, deleteItem);

router.put("/putItem",getDeveloperORqa, putItem);

module.exports = router;

