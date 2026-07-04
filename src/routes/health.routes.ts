import { Router } from "express";
import ApiResponse from "../utils/ApiResponse.js";

const router = Router();

router.get("/", (req, res) => {
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        status: "OK",
      },
      "Server is healthy"
    )
  );
});

export default router;