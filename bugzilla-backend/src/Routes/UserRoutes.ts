import express from "express";
import {
  postItem,
  getItem,
  deleteItem,
  putItem,
  userlogin,
  getDevelopers // Import the new function for fetching developers
} from "../Controllers/UserController";
import { getManager } from "../Middleware/Auth";

const router = express.Router();

router.post("/userlogin", userlogin)

router.post("/postItem", postItem);

router.get("/getItem", getManager, getItem); // Fix the route name to match the controller function

router.delete("/deleteItem", getManager, deleteItem);

router.put("/putItem", putItem);

router.get("/getDevelopers", getDevelopers); // Add the new route for fetching developers

module.exports = router;
