import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

const tempFolder = path.resolve(__dirname, '..','..','tmp');

export default {
    directory: tempFolder,

    storage: multer.diskStorage({
        destination: tempFolder,
        filename(request, file, callback) {
            const fileHahs = crypto.randomBytes(10).toString('HEX'); 
            const filename = `${fileHahs}-${file.originalname}`;

            return callback(null, filename);
        },
    })
}