import { updateUsernameByUid } from "../../util/serverDb";

export default async (req, res) => {
    if (req.method === 'POST') {
        let body = JSON.parse(req.body);
        let uid = body.uid;
        let username = body.username;
        if (username.match())
            try {
                await updateUsernameByUid(uid, username);
                res.send({ status: 'success' });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
    }
}