const dateFormateOptions = { month: "long", day: "numeric", year: "numeric" };
export function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", dateFormateOptions).format(date);
}
