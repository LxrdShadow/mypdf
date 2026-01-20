import "dotenv/config.js";
import express from "express";
import morgan from "morgan";

import errorHandler from "./shared/errors/errorHandler.js";
import { PORT } from "./config/env.js";

// ROUTERS IMPORT
import pdfRouter from "./modules/pdf/Pdf.routes.js";

const app = express();

// MIDDLEWARES
app.use(morgan(process.env.NODE_ENV == "production" ? "tiny" : "dev")).use(
    express.json(),
);

// ROUTERS SETUP
app.use("/api/v1/pdf", pdfRouter);

// GLOBAL ERROR HANDLING
app.use(errorHandler);

// START SERVER
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
