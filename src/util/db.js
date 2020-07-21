import { useState, useEffect, useRef } from "react";
import firebase from "./firebase";

export const firestore = firebase.firestore();

/**** USERS ****/

// Fetch user data (hook)
// This is called automatically by auth.js and merged into auth.user
export function useUser(uid) {
    return useQuery(uid && firestore.collection("users").doc(uid));
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

// Returns true if any user has the username(hook)
export function getUserByUsername(username) {
    return useQuery(firestore.collection("users").where("username", "==", username));
}

//Updates username for the user with the given uid
export function updateUsername(uid, username) {
    return firestore.collection("users").doc(uid).update({ username });
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

export const deleteComment = ({ workId, commentId }) => {
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

export function useProjectsByOwner(owner) {
    return useQuery(
        owner &&
        firestore
            .collection("works")
            .where("owner", "==", owner)
            .where("type", "==", "project")
    );
}

export function useBlogsByOwner(owner) {
    return useQuery(
        owner &&
        firestore
            .collection("works")
            .where("owner", "==", owner)
            .where("type", "==", "blog")
    );
}

export function useFeedData() {
    return useQuery(firestore.collection("works"));
}

export const useComments = (workId) => {
    return useQuery(firestore.collection(`works/${workId}/comments`));
};

/**** HELPERS ****/

// Custom React hook that subscribes to a Firestore query
function useQuery(query) {
    const [queryState, setQueryState] = useState({
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

function useQueryCache(query) {
    // Ref for storing previous query object
    const previousRef = useRef();
    const previous = previousRef.current;

    // Determine if query object is equal to previous
    const isEqual =
        (!previous && !query) || (previous && query && previous.isEqual(query));

    // If not equal update previous to query (for next render)
    // and then return new query below.
    useEffect(() => {
        if (!isEqual) {
            previousRef.current = query;
        }
    });

    return isEqual ? previous : query;
}
