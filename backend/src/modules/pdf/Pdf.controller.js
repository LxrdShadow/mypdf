import { PdfService } from "./Pdf.service.js";

export async function mergePdfs(req, res, next) {
    try {
        const pdfStream = await PdfService.merge(req.files);

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "attachment; filename=merged.pdf");

        pdfStream.pipe(res);
    } catch (error) {
        next(error);
    }
}
