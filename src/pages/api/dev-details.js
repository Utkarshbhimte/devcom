import { getDevDetailsFromServer } from "../../util/serverDb";

export default async (req, res) => {
  try {
    const devId = req.query.id;
    const response = await getDevDetailsFromServer(devId);

    res.send({ data: response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
