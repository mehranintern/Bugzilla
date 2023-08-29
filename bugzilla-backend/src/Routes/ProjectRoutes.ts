import express from "express";
import {
  postItem,
  getItem,
  deleteItem,
  putItem,
} from "../Controllers/ProjectController";
import { getManager, getManagerORqa } from "../Middleware/Auth";

const router = express.Router();

// router.post("/postItem", getManager, postItem);
router.post("/postItem", postItem);

// router.get("/gettItem", getManagerORqa, getItem);
router.get("/getItem", getItem)

router.delete("/deleteItem", getManager, deleteItem);

router.put("/putItem", getManager, putItem);


module.exports = router;
