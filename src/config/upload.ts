import path from 'path'
import crypto from 'crypto'
import multer from 'multer'

const uploadDir = path.resolve(__dirname, '..', '..', 'tmp')

export default {
  directory: uploadDir,
  storage: multer.diskStorage({
    destination: uploadDir,
    filename(request, file, callback) {
      const filename = crypto.randomBytes(10).toString('HEX');
      return callback(null, filename);
    },
  }),
}
