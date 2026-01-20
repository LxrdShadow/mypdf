import axios from "../../shared/axios/index.js";
import PdfService from "./Pdf.service.js";

export async function mergePdfs(req, res, next) {
    try {
        const pdfService = new PdfService(axios);
        const pdfStream = await pdfService.merge(req.files);

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "attachment; filename=merged.pdf");

        pdfStream.pipe(res);
    } catch (error) {
        next(error);
    }
}
