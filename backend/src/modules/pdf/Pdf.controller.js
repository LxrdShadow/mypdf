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

export async function compressPdf(req, res, next) {
    try {
        const expectedOutputSize = req.body.expectedOutputSize || "25KB";
        const pdfService = new PdfService(axios);
        const pdfStream = await pdfService.compress(
            req.file,
            expectedOutputSize,
        );

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
            "Content-Disposition",
            "attachment; filename=compressed.pdf",
        );

        pdfStream.pipe(res);
    } catch (error) {
        next(error);
    }
}

export async function rotatePdf(req, res, next) {
    try {
        const angle = req.body.angle || 0;
        const pdfService = new PdfService(axios);
        const pdfStream = await pdfService.rotate(req.file, angle);

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
            "Content-Disposition",
            "attachment; filename=rotated.pdf",
        );

        pdfStream.pipe(res);
    } catch (error) {
        next(error);
    }
}
