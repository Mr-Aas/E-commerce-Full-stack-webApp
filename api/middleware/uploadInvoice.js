import multer from "multer";
import path from "path";
import fs from "fs";

const uploadPath = "uploads/invoices";

// Create folder if it doesn't exist
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({

    destination(req, file, cb) {

        cb(null, uploadPath);

    },

    filename(req, file, cb) {

        const uniqueName =
            `${Date.now()}-${file.originalname}`;

        cb(null, uniqueName);

    }

});

const upload = multer({

    storage,

    limits: {

        fileSize: 5 * 1024 * 1024

    },

    fileFilter(req, file, cb) {

        if (file.mimetype !== "application/pdf") {

            return cb(new Error("Only PDF allowed"));

        }

        cb(null, true);

    }

});

export default upload;