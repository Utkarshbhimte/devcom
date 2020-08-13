const dateFormateOptions = { month: "long", day: "numeric", year: "numeric" };

export function formatFirebaseDate(date: number) {
  return new Intl.DateTimeFormat("en-US", dateFormateOptions).format(date);
}
