import { UserData, Work } from "./contracts";
import { useState, useEffect, useRef } from "react";
import {
  useCollection,
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";

import firebase from "./firebase";

import { Comment } from "./contracts";

export const firestore = firebase.firestore();

/**** USERS ****/

// Fetch user data (hook)
// This is called automatically by auth.js and merged into auth.user
export function useUser(uid) {
  return useDocumentData<UserData>(
    uid && firestore.collection("users").doc(uid)
  );
}

// Update an existing user
export function updateUser(uid, data) {
  return firestore.collection("users").doc(uid).update(data);
}

// Create a new user
export function createUser(uid, data) {
  return firestore
    .collection("users")
    .doc(uid)
    .set(
      {
        uid,
        ...data,
        created: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
}

/**** ITEMS ****/
/* Example query functions (modify to your needs) */

// Fetch all items by owner (hook)
export function useItemsByOwner(owner) {
  return useQuery(
    owner && firestore.collection("items").where("owner", "==", owner)
  );
}

// Fetch item data
export function useItem(id) {
  return useQuery(id && firestore.collection("items").doc(id));
}

// Update an item
export function updateItem(id, data) {
  return firestore.collection("items").doc(id).update(data);
}

// Create a new item
export function createItem(data) {
  return firestore.collection("items").add(data);
}

export function createWork(data) {
  return firestore
    .collection("works")
    .add({ ...data, created: firebase.firestore.FieldValue.serverTimestamp() });
}

export function getWork(id) {
  return firestore.collection("works").doc(id).get();
}

export function updateWork(id, data) {
  return firestore
    .collection("works")
    .doc(id)
    .update({
      ...data,
      updated: firebase.firestore.FieldValue.serverTimestamp(),
    });
}

export const deleteWork = ({ workId }) => {
  return firestore.doc(["works", workId].join("/")).delete();
};

export const deleteComment = ({
  workId,
  commentId,
}: {
  workId: string;
  commentId: string;
}) => {
  return firestore
    .doc(["works", workId, "comments", commentId].join("/"))
    .delete();
};

export function updateComment({ workId, text, commentId }) {
  return firestore.doc(`works/${workId}/comments/${commentId}`).update({
    text,
    updated: firebase.firestore.FieldValue.serverTimestamp(),
  });
}

export function createComment(workId, text, owner) {
  return firestore.collection(`works/${workId}/comments`).add({
    text,
    owner,
    workId,
    updated: firebase.firestore.FieldValue.serverTimestamp(),
    created: firebase.firestore.FieldValue.serverTimestamp(),
  });
}

export function useProjectsByOwner(
  owner
): [Work[], boolean, Error | undefined] {
  const [data, loading, error] = useCollection(
    owner &&
      firestore
        .collection("works")
        .where("owner", "==", owner)
        .where("type", "==", "project")
  );

  const dataWithId = data?.docs
    .filter((d) => !!d.exists)
    .map((d) => ({ ...d.data(), id: d.id })) as Work[];
  return [dataWithId, loading, error];
}
export function useBlogsByOwner(owner): [Work[], boolean, Error | undefined] {
  const [data, loading, error] = useCollection(
    owner &&
      firestore
        .collection("works")
        .where("owner", "==", owner)
        .where("type", "==", "blog")
  );

  const dataWithId = data?.docs
    .filter((d) => !!d.exists)
    .map((d) => ({ ...d.data(), id: d.id })) as Work[];
  return [dataWithId, loading, error];
}

export function useFeedData() {
  return useQuery(firestore.collection("works"));
}

export const useComments = (
  workId
): [Comment[], boolean, Error | undefined] => {
  const [data, loading, error] = useCollection(
    firestore.collection(`works/${workId}/comments`)
  );

  const dataWithId = data?.docs
    .filter((d) => !!d.exists)
    .map((d) => ({ ...d.data(), id: d.id })) as Comment[];
  return [dataWithId, loading, error];
};

/**** HELPERS ****/

// Custom React hook that subscribes to a Firestore query
interface QueryState<T> {
  status: "loading" | "success" | "error";
  data?: T;
  error?: string | null;
}
function useQuery<T>(query) {
  const [queryState, setQueryState] = useState<QueryState<T>>({
    status: "loading",
    data: undefined,
    error: null,
  });

  // Gives us previous query object if query is the same
  // ensuring we don't unsubscribe and resubscribe below.
  const queryCached = useQueryCache(query);

  useEffect(() => {
    // Skip if falsy value, as that allows us to wait on needed
    // needed data before constructing query and passing it into useQuery.
    if (queryCached) {
      return queryCached.onSnapshot(
        (response) => {
          // Get data for collection or doc
          const data = response.docs
            ? getCollectionData(response)
            : getDocData(response);

          setQueryState({
            status: "success",
            data: data,
            error: null,
          });
        },
        (error) => {
          setQueryState((state) => ({
            status: "error",
            data: state.data,
            error: error,
          }));
        }
      );
    }
  }, [queryCached]);

  return queryState;
}

// Get doc data
function getDocData(doc) {
  return doc.exists === true ? { id: doc.id, ...doc.data() } : null;
}

// Get array of doc data from collection
function getCollectionData(collection) {
  return collection.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
}

function useQueryCache<T extends Object>(query) {
  // Ref for storing previous query object
  const previousRef = useRef<T>();
  const previous = previousRef.current;

  // Determine if query object is equal to previous
  const isEqual =
    (!previous && !query) || (previous && query && previous === query);

  // If not equal update previous to query (for next render)
  // and then return new query below.
  useEffect(() => {
    if (!isEqual) {
      previousRef.current = query;
    }
  });

  return isEqual ? previous : query;
}
