const { firestore } = require("./db");

export const getWorkDetailsFromServer = async (workId) => {
  const snapshot = await firestore.doc(`works/${workId}`).get();
  const data = snapshot.data();
  return data;
};
