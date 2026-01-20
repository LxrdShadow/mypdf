import { Router } from "express";
import { compressPdf, mergePdfs } from "./Pdf.controller.js";
import upload from "../../shared/upload/index.js";

const router = Router();

router.post("/merge", upload.array("files", 10), mergePdfs);
router.post("/compress", upload.single("file"), compressPdf);

export default router;
