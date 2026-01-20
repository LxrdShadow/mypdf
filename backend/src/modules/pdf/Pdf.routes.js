import { Router } from "express";
import {
    compressPdf,
    convertPdfToHtml,
    convertPdfToMd,
    mergePdfs,
    rotatePdf,
} from "./Pdf.controller.js";
import upload from "../../shared/upload/index.js";

const router = Router();

router.post("/merge", upload.array("files", 10), mergePdfs);
router.post("/compress", upload.single("file"), compressPdf);
router.post("/rotate", upload.single("file"), rotatePdf);
router.post("/to-html", upload.single("file"), convertPdfToHtml);
router.post("/to-md", upload.single("file"), convertPdfToMd);

export default router;
