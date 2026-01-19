const AppError = require("../../shared/errors/AppError");
const axios = require("../../shared/axios");

const merge = async (files) => {
    const formData = new FormData();
    files.forEach((file) => {
        formData.append(
            "fileInput",
            new Blob([file.buffer], { type: file.mimetype }),
            file.originalname,
        );
    });

    try {
        const response = await axios.post("general/merge-pdfs", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            responseType: "stream",
        });

        return response.data;
    } catch (error) {
        throw new AppError(
            error.response?.data?.message || error.response?.statusText,
            error.response?.status,
        );
    }
};

module.exports.PdfService = { merge };
