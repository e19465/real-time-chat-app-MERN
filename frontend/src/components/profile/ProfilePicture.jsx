import { useState } from "react";
import NO_AVATAR from "../../../public/noavatar.webp";
import { Camera } from "lucide-react";
import UserService from "../../services/UserService";
import { toast } from "react-toastify";
import {
  globalErrorHandler,
  globalSuccessHandler,
} from "../../helpers/responseHandler";
import LoadingText from "../common/LoadingText";
import { backendNeededKeys } from "../../constants/shared";

const ProfilePicture = ({ isOwnerProfile, profilePicUrl }) => {
  const [imgUrl, setImgUrl] = useState(profilePicUrl || NO_AVATAR);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImgUrl(URL.createObjectURL(file));
  };

  const handleUpdateProfilePicture = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      toast.info("Please select an image to upload");
      return;
    }

    try {
      setLoading(true);
      let formData = new FormData();
      formData.append(backendNeededKeys.DP_FORM_DATA_KEY, imageFile);
      const response = await UserService.updateProfilePicture(formData);
      globalSuccessHandler(response, "Profile picture updated");
    } catch (err) {
      globalErrorHandler(
        err,
        "Error updating profile picture",
        "Profile picture update failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="w-full h-auto flex flex-col items-center justify-center"
      onSubmit={handleUpdateProfilePicture}
    >
      <div className="w-24 h-24 relative">
        <img
          src={imgUrl}
          alt="profile"
          className="w-24 h-24 rounded-full object-cover border border-gray-800"
          loading="lazy"
        />

        <label
          htmlFor="profile-pic-input"
          className="absolute bottom-2 right-1 cursor-pointer bg-gray-800 p-1 rounded-full border border-gray-600"
        >
          <Camera className="size-4 text-primary" />
        </label>

        <input
          type="file"
          accept="image/*"
          name="profile-pic-input"
          id="profile-pic-input"
          className="hidden"
          onChange={handleImageChange}
        />
      </div>
      <div className="w-full h-auto flex items-center justify-center mt-2">
        <button
          type="submit"
          className="px-4 py-1 bg-base-200 rounded-md shadow-md flex items-center justify-center gap-1"
        >
          <LoadingText
            loading={loading}
            loadingText={"Updating..."}
            notLoadingText={"Update"}
          />
        </button>
      </div>
    </form>
  );
};

export default ProfilePicture;
