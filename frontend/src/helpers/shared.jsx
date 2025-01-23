export const formatDateFromMongoDbDate = (inputDate) => {
  if (!inputDate) return "";
  const date = new Date(inputDate);
  const options = { year: "numeric", month: "short", day: "numeric" };
  return date.toLocaleDateString("en-GB", options);
};
