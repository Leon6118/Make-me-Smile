import express from "express";
import cors from "cors";
import path from "path";
import router from "./routes";
import { errorHandler } from "./middlewares/error.middleware";
import { logger } from "./utils/logger";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", router);
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use(errorHandler);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
