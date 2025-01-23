import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import UserService from "../../services/UserService";
import { useNavigate, useParams } from "react-router-dom";
import { globalErrorHandler } from "../../helpers/responseHandler";
import ProfilePicture from "../../components/profile/ProfilePicture";
import { Loader, Mail, User } from "lucide-react";
import { CommonPageUrls } from "../../constants/pageUrls";
import InputContainer from "../../components/auth/InputContainer";
import { formatDateFromMongoDbDate } from "../../helpers/shared";

const UserProfilePage = () => {
  //! Hooks
  const navigate = useNavigate();
  const { userId } = useParams();

  //! State variables
  const [userProfile, setUserProfile] = useState(null);
  const [profileDataLoading, setProfileDataLoading] = useState(false);
  const [accessCheckLoading, setAccessCheckLoading] = useState(false);
  const [isOwnerProfile, setIsOwnerProfile] = useState(false);
  const [profileTitle, setProfileTitle] = useState("Profile Information");

  //! Fetch user profile
  useEffect(() => {
    const getUserProfile = async () => {
      try {
        setProfileDataLoading(true);
        const response = await UserService.getProfile(userId);
        setUserProfile(response.data);
      } catch (err) {
        globalErrorHandler(
          err,
          "Error fetching user profile",
          "Error fetching user profile"
        );
        navigate(CommonPageUrls.home);
      } finally {
        setProfileDataLoading(false);
      }
    };

    const checkLoggedInUserWithParamsId = async () => {
      try {
        setAccessCheckLoading(true);
        const response = await UserService.checkLoggedInUserWithParamsId(
          userId
        );
        setIsOwnerProfile(true);
      } catch (err) {
        setIsOwnerProfile(false);
      } finally {
        setAccessCheckLoading(false);
      }
    };
    checkLoggedInUserWithParamsId();
    getUserProfile();
  }, [userId]);

  //! Set profile title
  useEffect(() => {
    if (userProfile) {
      if (isOwnerProfile) {
        setProfileTitle("Your Profile Information");
      } else {
        const userName = userProfile?.fullName || "User";
        setProfileTitle(`${userName}'s Profile Information`);
      }
    }
  }, [userProfile]);

  return (
    <MainLayout>
      <div className="w-full min-h-full h-auto flex items-center justify-center">
        <div className="w-full md:w-3/4 lg:w-1/2 xl:w-1/3 mx-auto h-[550px] flex flex-col gap-4 items-center justify-center bg-base-300 rounded-lg shadow-lg shadow-gray-800 p-4">
          {profileDataLoading && accessCheckLoading ? (
            <div className="w-full h-full flex flex-col gap-2 items-center justify-center">
              <Loader className="size-20 animate-spin" />
              <span className="">Getting user profile...</span>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="w-full h-auto flex flex-col items-center justify-center">
                <h1 className="text-lg capitalize font-semibold">profile</h1>
                <span>{profileTitle}</span>
              </div>

              {/* Profile picture component */}
              <div className="w-full h-auto flex flex-col items-center justify-center">
                <ProfilePicture
                  isOwnerProfile={isOwnerProfile}
                  profilePicUrl={userProfile?.profilePic}
                />
              </div>

              {/* Details component */}
              <div className="w-full h-auto flex flex-col gap-2 items-center justify-center">
                <InputContainer
                  label="Full Name"
                  Icon={User}
                  classNameContainer="gap-1"
                  classNameP="pl-1 text-sm"
                >
                  <input
                    type="text"
                    className="grow placeholder:text-sm"
                    required
                    disabled
                    placeholder="John Doe"
                    name="full-name-profile"
                    id="full-name-profile"
                    value={userProfile?.fullName || ""}
                  />
                </InputContainer>
                <InputContainer
                  label="Email"
                  Icon={Mail}
                  classNameContainer="gap-1"
                  classNameP="pl-1 text-sm"
                >
                  <input
                    type="email"
                    className="grow placeholder:text-sm"
                    name="email-profile"
                    id="email-profile"
                    required
                    disabled
                    placeholder="jodndoe@gmail.com"
                    value={userProfile?.email || ""}
                  />
                </InputContainer>
              </div>

              {/* Footer component */}
              <div className="w-full h-auto flex flex-col items-center justify-between gap-4 bg-base-200 rounded-lg p-6 text-sm">
                <h1 className="w-full text-base text-left font-semibold text-gray-400">
                  Account Information
                </h1>

                <div className="w-full h-auto flex flex-col gap-2 items-center justify-between">
                  <div className="w-full h-auto flex items-center justify-between pb-2 border-b border-gray-600">
                    <span>Member since</span>
                    <span>
                      {formatDateFromMongoDbDate(userProfile?.createdAt)}
                    </span>
                  </div>

                  <div className="w-full h-auto flex items-center justify-between">
                    <span>Status</span>
                    <span>active</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default UserProfilePage;
