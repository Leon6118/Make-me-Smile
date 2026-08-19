import multer from "multer";
import path from "path";
import fs from "fs";

// Creación carpeta uploads si no existe
const uploadPath = path.join(__dirname, "../../uploads");
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {cb(null, uploadPath);},
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName);
    }
});

const fileFilter = (req: any, file: any, cb: any) => {
    const allowed = ["image/png", "image/jpeg", "application/pdf"];
    if (allowed.includes(file.mimetype)) {
        cb(null, true);
    } else {cb(new Error("Tipo de archivo no permitido"), false);}
};

export const upload = multer({ storage, fileFilter });
