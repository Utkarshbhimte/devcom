import { getUserByUsername } from "../../util/serverDb";

export default async (req, res) => {
    try {
        const username = req.query.username;
        const response = await getUserByUsername(username);
        let isUsernameAvailable = true;
        if (response.length != 0) {
            isUsernameAvailable = false;
        }
        res.send({ isUsernameAvailable });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}