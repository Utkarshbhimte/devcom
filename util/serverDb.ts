import { Work, UserData } from "./contracts";
import admin, { ServiceAccount } from "firebase-admin";
import { addMetaToFirebaseDoc } from "./util";

const {
  NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  FIREBASE_PRIVATE_KEY,
  FIREBASE_CLIENT_EMAIL,
} = process.env;

try {
  if (!NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
    throw new Error("Firebase service account is not implemented properly");
  }

  const serviceAccountCredentials: ServiceAccount = {
    projectId: NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    clientEmail: FIREBASE_CLIENT_EMAIL,
  };

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountCredentials),
    databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
  });
} catch (error) {
  /*
   * We skip the "already exists" message which is
   * not an actual error when we're hot-reloading.
   */
  if (error.code == "app/duplicate-app") {
    // eslint-disable-next-line no-console
    // console.error("Firebase admin initialization error", error.stack);
  } else {
    console.error(error);
  }
}

const db = admin.firestore();

export const getWorkList = async (): Promise<{ data: Work[] }> => {
  const querySnapshot = await db.collection("works").orderBy("created").get();
  let workList: Work[] = querySnapshot.docs.map((doc) => {
    const data = doc.data() as Work;

    return {
      id: doc.id,
      ...data,
      created: doc.createTime.toMillis(),
      updated: doc.updateTime.toMillis(),
    };
  });

  const data = (await Promise.all(
    workList.map(async (work) => {
      const ownerDoc = await db.doc(`users/${work.owner}`).get();
      work.ownerData = ownerDoc.data() as UserData;
      return work;
    })
  )) as Work[];

  return { data };
};

export const getWorkDetailsFromServer = async (workId) => {
  const doc = await db.doc(`works/${workId}`).get();
  const data = doc.data();

  const ownerDoc = await db.doc(`users/${data.owner}`).get();
  data.ownerData = ownerDoc.data();

  return data;
};

export const getDevDetailsFromServer = async (devId) => {
  const doc = await db.doc(`users/${devId}`).get();
  const data = addMetaToFirebaseDoc(doc) as UserData;

  const workData = await db
    .collection(`works`)
    .where("owner", "==", devId)
    .get();

  data.works = workData.docs.map(addMetaToFirebaseDoc) as Work[];
  return data;
};
