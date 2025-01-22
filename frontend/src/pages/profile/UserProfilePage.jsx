import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import AuthService from "../../services/AuthService";
import UserService from "../../services/UserService";
import { useNavigate, useParams } from "react-router-dom";
import { globalErrorHandler } from "../../helpers/responseHandler";
import ProfilePicture from "../../components/profile/ProfilePicture";
import { Loader } from "lucide-react";
import { commonPageUrls } from "../../constants/pageUrls";

const UserProfilePage = () => {
  //! Hooks
  const navigate = useNavigate();
  const { userId } = useParams();

  //! State variables
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const isOwnerProfile = AuthService.isLoggedInUser(userId);
  const [profileTitle, setProfileTitle] = useState("Profile");

  //! Fetch user profile
  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const response = await UserService.getProfile(userId);
        setUserProfile(response.data);
      } catch (err) {
        globalErrorHandler(
          err,
          "Error fetching user profile",
          "Error fetching user profile"
        );
        navigate(commonPageUrls.home);
      } finally {
        setLoading(false);
      }
    };
    getUserProfile();
  }, [userId]);

  //! Set profile title
  useEffect(() => {
    if (userProfile) {
      if (isOwnerProfile) {
        setProfileTitle("Your Profile");
      } else {
        const userName = userProfile?.fullName || "User";
        setProfileTitle(`${userName}'s Profile`);
      }
    }
  }, [userProfile]);

  return (
    <MainLayout>
      <div className="w-full md:w-3/4 lg:w-1/2 mx-auto h-[550px] flex flex-col items-center justify-center overflow-y-auto bg-base-300 rounded-lg shadow-lg shadow-gray-800 p-4">
        {loading ? (
          <div className="w-full h-full flex flex-col gap-2 items-center justify-center">
            <Loader className="size-20 animate-spin" />
            <span className="">Getting user profile...</span>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="w-full h-auto flex flex-col items-center justify-center">
              <h1 className="text-lg capitalize font-semibold">
                {profileTitle}
              </h1>
              <span></span>
            </div>

            {/* Profile picture component */}
            <div>
              <ProfilePicture isOwnerProfile={isOwnerProfile} />
            </div>

            {/* Details component */}
            <div></div>

            {/* Footer component */}
            <div></div>
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default UserProfilePage;
