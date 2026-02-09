import multer from 'multer';
import { response } from '../utils/index.js';

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  if (err.isJoi) {
    return response(res, 400, err.details[0].message, null);
  }

  if (err.code === 'LIMIT_FILE_SIZE') {
    return response(res, 413, 'Berkas terlalu besar', null);
  }

  if (err instanceof multer.MulterError) {
    return response(res, 400, 'Hanya file gambar yang diperbolehkan!', null);
  }

  const status = 500;
  const message = 'Internal Server Error';

  console.error('Unhandled error: ', err);
  return response(res, status, message, null);
};

export default errorHandler;