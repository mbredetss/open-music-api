import { nanoid } from 'nanoid';
import { response } from '../../../utils/index.js';
import collaborationRepositories from '../repositories/collaboration-repositories.js';

export const addCollaborator = async (req, res) => {
  const { playlistId, userId } = req.body;
  const id = `collab_id${nanoid(16)}`;

  try {
    await collaborationRepositories.addCollaborator(id, userId, playlistId);

    return response(res, 201, null, { collaborationId: id });
  } catch (e) {
    console.log(e);
    return response(res, 404, 'Kolaborator gagal di tambahkan!');
  }
};

export const deleteCollaborator = async (req, res) => {
  const { playlistId, userId } = req.body;
  const result = await collaborationRepositories.deleteCollaborator(playlistId, userId);

  if (result) {
    return response(res, 200, 'Kolaborator berhasil dihapus!', null);
  }

  return response(res, 400, 'Kolaborator gagal dihapus!', null);
};