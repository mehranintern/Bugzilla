import express from "express";
import {
  postItem,
  getItem,
  deleteItem,
  putItem,
  userlogin
} from "../Controllers/UserController";
import { getManager } from "../Middleware/Auth";

const router = express.Router();

router.post("/userlogin", userlogin)

router.post("/postItem", postItem);

router.get("/gettItem",getManager, getItem);

router.delete("/deleteItem",getManager, deleteItem);

router.put("/putItem", putItem);

module.exports = router;

