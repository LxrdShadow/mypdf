import { Router } from "express";
import { mergePdfs } from "./Pdf.controller.js";
import upload from "../../shared/upload/index.js";

const router = Router();

router.post("/merge", upload.array("files", 10), mergePdfs);

export default router;
