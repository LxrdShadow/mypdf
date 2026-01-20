import "dotenv/config.js";
import { PORT } from "./config/env.js";

import app from "./app.js";

// START SERVER
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
