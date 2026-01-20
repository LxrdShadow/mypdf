import express from "express";
import morgan from "morgan";

// MIDDLEWARES IMPORT
import errorHandler from "./shared/errors/errorHandler.js";

// ROUTERS IMPORT
import pdfRouter from "./modules/pdf/Pdf.routes.js";

const app = express();

// MIDDLEWARES SETUP
app.use(morgan(process.env.NODE_ENV == "production" ? "tiny" : "dev")).use(
    express.json(),
);

// ROUTERS SETUP
app.use("/api/v1/pdf", pdfRouter);

// GLOBAL ERROR HANDLING
app.use(errorHandler);

export default app;
