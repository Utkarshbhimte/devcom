import firebase from "./firebase";

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

// Create an Error with custom message and code
export function CustomError(code, message) {
    const error = new Error(message);
    error.code = code;
    return error;
}

//Regex for username validation
export const alphanumericRegex = /^[\da-z-]+$/i;
export const consecutiveHyphenRegex = /^(?!.*--).*$/i;
export const endHypenRegex = /^[a-z0-9].*(?<!-)$/i;
export const maxCharacterRegex = /^.{1,39}$/;

// Returns true if input matches regex
export function checkRegexValid(input, regex) {
    return input.match(regex) != null;
}
