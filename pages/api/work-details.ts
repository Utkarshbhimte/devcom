import { getWorkDetailsFromServer } from "../../util/serverDb";

export default async (req, res) => {
  try {
    const workId = req.query.workId;

    const response = await getWorkDetailsFromServer(workId);

    res.send({ data: response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
