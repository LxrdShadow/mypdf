const express = require("express");
const { mergePdfs } = require("./Pdf.controller");
const upload = require("../../shared/upload");

const router = express.Router();

router.post("/merge", upload.array("files", 10), mergePdfs);

module.exports = router;
