import AppError from "../../shared/errors/AppError.js";

class PdfService {
    constructor(client) {
        this.client = client;
    }

    async merge(files) {
        const formData = new FormData();
        files.forEach((file) => {
            formData.append(
                "fileInput",
                new Blob([file.buffer], { type: file.mimetype }),
                file.originalname,
            );
        });

        try {
            const response = await this.client.post(
                "general/merge-pdfs",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    responseType: "stream",
                },
            );

            return response.data;
        } catch (error) {
            throw new AppError(
                error.response?.data?.message || error.response?.statusText,
                error.response?.status,
            );
        }
    }
}

export default PdfService;
