import AppError from "../../shared/errors/AppError.js";
import { readStream } from "../../shared/axios/index.js";

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
                    responseType: "stream",
                },
            );

            return response.data;
        } catch (error) {
            if (error.response?.data?.readable) {
                const raw = await readStream(error.response.data);

                let message = raw;
                try {
                    const parsed = JSON.parse(raw);
                    message = parsed.message || parsed.error || raw;
                } catch {
                    throw new AppError(
                        error.response?.data?.messag,
                        error.response?.status,
                    );
                }

                throw new AppError(message, error.response.status);
            }

            throw new AppError(
                error.response?.data?.message,
                error.response?.status,
            );
        }
    }

    async compress(file, expectedOutputSize) {
        const formData = this.getFormData([file], "fileInput");
        formData.append("expectedOutputSize", expectedOutputSize);

        try {
            const response = await this.client.post(
                "misc/compress-pdf",
                formData,
                {
                    responseType: "stream",
                },
            );

            return response.data;
        } catch (error) {
            if (error.response?.data?.readable) {
                const raw = await readStream(error.response.data);

                let message = raw;
                try {
                    const parsed = JSON.parse(raw);
                    message = parsed.message || parsed.error || raw;
                } catch {
                    throw new AppError(
                        error.response?.data?.messag,
                        error.response?.status,
                    );
                }

                throw new AppError(message, error.response.status);
            }

            throw new AppError(
                error.response?.data?.message,
                error.response?.status,
            );
        }
    }

    async rotate(file, angle) {
        const formData = this.getFormData([file], "fileInput");
        formData.append("angle", angle);

        try {
            const response = await this.client.post(
                "general/rotate-pdf",
                formData,
                {
                    responseType: "stream",
                },
            );

            return response.data;
        } catch (error) {
            if (error.response?.data?.readable) {
                const raw = await readStream(error.response.data);

                let message = raw;
                try {
                    const parsed = JSON.parse(raw);
                    message = parsed.message || parsed.error || raw;
                } catch {
                    throw new AppError(
                        error.response?.data?.messag,
                        error.response?.status,
                    );
                }

                throw new AppError(message, error.response.status);
            }

            throw new AppError(
                error.response?.data?.message,
                error.response?.status,
            );
        }
    }
}

export default PdfService;
