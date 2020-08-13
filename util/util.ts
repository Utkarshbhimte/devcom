import firebase from "./firebase";
import { firestore } from "firebase-admin";

export async function apiRequest(path, method = "GET", data) {
  const accessToken = firebase.auth().currentUser
    ? await firebase.auth().currentUser.getIdToken()
    : undefined;

  return fetch(`/api/${path}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: data ? JSON.stringify(data) : undefined,
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.status === "error") {
        // Automatically signout user if accessToken is no longer valid
        if (response.code === "auth/invalid-user-token") {
          firebase.auth().signOut();
        }

        throw new CustomError(response.code, response.message);
      } else {
        return response.data;
      }
    });
}

export const addMetaToFirebaseDoc = (
  doc: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>
) => {
  let data = doc.data();

  const docWithEntity = {
    ...data,
    id: doc.id,
    created: doc.updateTime.toMillis(),
    updated: doc.updateTime.toMillis(),
  };

  return docWithEntity;
};

// Create an Error with custom message and code
export class CustomError {
  constructor(code: number, message?: string) {
    const error = new Error(message);
    (error as any).code = code;
    return error;
  }
}
