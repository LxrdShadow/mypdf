require("dotenv").config({ quiet: process.env.NODE_ENV == "production" });
const express = require("express");
const morgan = require("morgan");

const errorHandler = require("./shared/errors/errorHandler");
const { PORT } = require("./config/env");

const app = express();

// MIDDLEWARES
app.use(morgan(process.env.NODE_ENV == "production" ? "tiny" : "dev")).use(
    express.json(),
);

// ROUTERS
const pdfRouter = require("./modules/pdf/Pdf.routes");

app.use("/api/v1/pdf", pdfRouter);

// GLOBAL ERROR HANDLING
app.use(errorHandler);

// START SERVER
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
