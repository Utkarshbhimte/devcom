import absoluteUrl from "next-absolute-url";

export const fetchRelative = (req) => (path) => {
  const { origin } = absoluteUrl(req, "localhost:3000");
  return fetch(origin + path);
};
