import { Eye, EyeOff, Lock } from "lucide-react";
import MainLayout from "../../layouts/MainLayout";
import { useState } from "react";
import InputContainer from "../../components/auth/InputContainer";
import LoadingText from "../../components/common/LoadingText";
import AuthService from "../../services/AuthService";
import {
  globalErrorHandler,
  globalSuccessHandler,
} from "../../helpers/responseHandler";

const UserSettingsPage = () => {
  //! State variables
  const [formData, setFormData] = useState({
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmNewPasswordVisible, setIsConfirmNewPasswordVisible] =
    useState(false);

  //! methods for toggling password visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };
  const toggleNewPasswordVisibility = () => {
    setIsNewPasswordVisible((prevState) => !prevState);
  };
  const toggleConfirmNewPasswordVisibility = () => {
    setIsConfirmNewPasswordVisible((prevState) => !prevState);
  };

  //! method for updating password
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await AuthService.changePassword(formData);
      globalSuccessHandler(response, "Password updated successfully");
      setFormData({
        password: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    } catch (err) {
      globalErrorHandler(
        err,
        "Error updating password",
        "Password update failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="w-full min-h-full h-auto flex items-center justify-center">
        <div className="w-full md:w-3/4 lg:w-1/2 xl:w-1/3 mx-auto h-[500px] flex flex-col gap-4 items-center justify-center bg-base-300 rounded-lg shadow-lg shadow-gray-800 p-4">
          {/* Header */}
          <div className="w-full h-auto flex flex-col items-center justify-center">
            <h1 className="text-lg capitalize font-semibold">settings</h1>
            <span>Manage your account settings</span>
          </div>

          {/* Inputs */}
          <form
            className="w-full h-auto flex flex-col overflow-auto border border-gray-600 rounded-md shadow-md p-4 gap-2"
            onSubmit={handlePasswordUpdate}
          >
            <h2 className="w-full text-left text-lg font-semibold capitalize mb-2">
              Change Password
            </h2>

            {/* Old password */}
            <InputContainer
              label="Old Password"
              Icon={Lock}
              classNameP="pl-1 text-sm"
              classNameContainer="gap-1"
            >
              <input
                type={isPasswordVisible ? "text" : "password"}
                className="grow placeholder:text-sm"
                placeholder="old password"
                required
                name="old-password-change-password"
                id="old-password-change-password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="text-primary"
              >
                {isPasswordVisible ? <EyeOff size={24} /> : <Eye size={24} />}
              </button>
            </InputContainer>

            {/* New password */}
            <InputContainer
              label="New Password"
              Icon={Lock}
              classNameP="pl-1 text-sm"
              classNameContainer="gap-1"
            >
              <input
                type={isNewPasswordVisible ? "text" : "password"}
                className="grow placeholder:text-sm"
                placeholder="new password"
                required
                name="new-password-change-password"
                id="new-password-change-password"
                value={formData.newPassword}
                onChange={(e) =>
                  setFormData({ ...formData, newPassword: e.target.value })
                }
              />
              <button
                type="button"
                onClick={toggleNewPasswordVisibility}
                className="text-primary"
              >
                {isNewPasswordVisible ? (
                  <EyeOff size={24} />
                ) : (
                  <Eye size={24} />
                )}
              </button>
            </InputContainer>

            {/* Confirm new password */}
            <InputContainer
              label="Confirm New Password"
              Icon={Lock}
              classNameP="pl-1 text-sm"
              classNameContainer="gap-1"
            >
              <input
                type={isConfirmNewPasswordVisible ? "text" : "password"}
                className="grow placeholder:text-sm"
                value={formData.confirmNewPassword}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    confirmNewPassword: e.target.value,
                  })
                }
                required
                name="confim-password-change-password"
                id="confim-password-change-password"
                placeholder="confirm new password"
              />
              <button
                type="button"
                onClick={toggleConfirmNewPasswordVisibility}
                className="text-primary"
              >
                {isConfirmNewPasswordVisible ? (
                  <EyeOff size={24} />
                ) : (
                  <Eye size={24} />
                )}
              </button>
            </InputContainer>

            <div className="w-full flex items-center justify-end">
              <button
                className="flex items-center justify-center px-4 py-1 bg-primary rounded-md shadow-md text-base-300 capitalize font-semibold mt-4 gap-1"
                type="submit"
              >
                <LoadingText
                  loading={loading}
                  loadingText={"Updating..."}
                  notLoadingText={"Update"}
                />
              </button>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default UserSettingsPage;
