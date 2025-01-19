const { BadRequestError } = require("../helpers/CustomErrors");
const cloudinary = require("../config/cloudinary");
const { getUniqueId } = require("../helpers/Utils");

class FilesUploadService {
  //! This function will be used to upload files to cloudinary and return the urls
  async uploadFilesAndGiveUrls(req, folder) {
    try {
      if (!req.file && (!req.files || req.files.length === 0)) {
        throw new BadRequestError("No files uploaded");
      }

      // If `req.file` exists, it's a single file upload
      const files = req.file ? [req.file] : req.files;

      // write cloudinary upload and retuen urls here
      const uploadPromises = files.map((file) =>
        cloudinary.uploader.upload(
          file.path,
          {
            resource_type: "auto", // Let cloudinary determine the file type
            folder: folder, // Optional: Add a folder
            public_id: getUniqueId(), // Optional: Add a unique public_id
          },
          function (error, result) {
            if (error) {
              throw error;
            }
            return result;
          }
        )
      );
      const results = await Promise.all(uploadPromises);
      return results.map((result) => result.url);
    } catch (err) {
      throw err;
    }
  }

  //! This function will be used to delete files from cloudinary
  async deleteFilesByUrls(urls) {
    try {
      if (!urls || urls.length === 0) {
        return { message: "No files to delete" };
      }

      // write cloudinary delete here
      const deletePromises = urls.map((url) =>
        cloudinary.uploader.destroy(url, function (error, result) {
          if (error) {
            throw error;
          }
          return result;
        })
      );
      const results = await Promise.all(deletePromises);
      return results;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = new FilesUploadService();
