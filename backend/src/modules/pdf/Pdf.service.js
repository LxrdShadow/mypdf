import AppError from "../../shared/errors/AppError.js";

class PdfService {
    constructor(client) {
        this.client = client;
    }

    getFormData(files, fieldName) {
        const formData = new FormData();
        files.forEach((file) =>
            formData.append(
                fieldName,
                new Blob([file.buffer], { type: file.mimetype }),
                file.originalname,
            ),
        );
        return formData;
    }

    async merge(files) {
        const formData = this.getFormData(files, "fileInput");

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

    async compress(file, expectedOutputSize) {
        const formData = this.getFormData([file], "fileInput");

        try {
            const response = await this.client.post(
                "general/merge-pdfs",
                { ...formData, expectedOutputSize },
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
