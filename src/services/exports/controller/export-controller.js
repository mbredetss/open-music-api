import { response } from "../../../utils/index.js";
import ExportService from "../producers/export-service.js"

export const exportPlaylists = async (req, res) => {
    const { targetEmail } = req.body;
    const playlistId = req.params.id;

    const message = {
        playlistId, 
        targetEmail
    };

    await ExportService.sendMessage('export:playlists', JSON.stringify(message));

    return response(res, 201, 'Permintaan Anda sedang kami proses', null);
}