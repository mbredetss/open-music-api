import { response } from '../../../utils/index.js';
import process from 'process';
import albumRepositories from '../../albums/repositories/album-repositories.js';

export const uploadCoverImages = async (req, res) => {
  if (!req.file) {
    return response(res, 500, 'No file uploaded');
  }

  const host = process.env.HOST || 'localhost';
  const port = process.env.PORT;

  const encodedFilename = encodeURIComponent(req.file.filename);
  const fileLocation = `http://${host}:${port}/covers/${encodedFilename}`;


  const albumId = req.params.id;
  const result = await albumRepositories.updateAlbumCover(fileLocation, albumId);

  if (result > 0) {
    return response(res, 201, 'Sampul berhasil diunggah', null);
  }

  return response(res, 400, 'Sampul gagal ditambahkan', null);
};