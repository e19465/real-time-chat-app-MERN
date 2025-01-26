export const formatDateFromMongoDbDate = (inputDate) => {
  if (!inputDate) return "";
  const date = new Date(inputDate);
  const options = { year: "numeric", month: "short", day: "numeric" };
  return date.toLocaleDateString("en-GB", options);
};

export const checkUrlIsImage = (url) => {
  if (!url || typeof url !== "string") return false;

  // Check if the URL ends with common image extensions
  const imageExtensions = /\.(jpeg|jpg|gif|png|bmp|webp|svg)$/i;
  return imageExtensions.test(url);
};

export const getFileType = (url) => {
  if (!url || typeof url !== "string") return null;

  // Define file type categories
  const fileTypes = {
    image: /\.(jpeg|jpg|gif|png|bmp|webp|svg)$/i,
    word: /\.(doc|docx)$/i,
    pdf: /\.(pdf)$/i,
    excel: /\.(xls|xlsx)$/i,
    text: /\.(txt)$/i,
    compressed: /\.(zip|rar)$/i,
  };

  // Check each file type and return the matching type
  for (const [type, regex] of Object.entries(fileTypes)) {
    if (regex.test(url)) {
      return `${type} file`;
    }
  }

  // If no file type matches, return 'unknown'
  return "file";
};
