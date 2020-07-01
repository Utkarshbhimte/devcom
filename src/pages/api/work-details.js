import { getWorkDetailsFromServer } from "util/serverDb";

export default async (req, res) => {
  const workId = req.query.workId;

  const response = await getWorkDetailsFromServer(workId);

  res.send({ data: response });
};
