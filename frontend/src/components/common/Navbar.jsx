import { useState } from "react";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";
import { LogOut, DoorOpen, User, Settings } from "lucide-react";
import {
  globalErrorHandler,
  globalSuccessHandler,
} from "../../helpers/responseHandler";
import {
  AuthPageUrls,
  CommonPageUrls,
  getOwnProfileUrl,
  UserPageUrls,
} from "../../constants/pageUrls";
import { ProgressLink } from "../nprogress/NProgressHandler";
import ThemeChange from "./ThemeChange";
import { useAuthStore } from "../../store/useAuthStore";
import { useChatStore } from "../../store/useChatStore";

const Navbar = () => {
  //! Hooks
  const navigate = useNavigate();

  //! Accessing store to perform actions
  const clearSessionData = useAuthStore((store) => store.clearSessionData);
  const clearSelectedChatUserId = useChatStore(
    (state) => state.clearSelectedChatUserId
  );

  //! State variables
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //! Logout handler
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await AuthService.logout();
      globalSuccessHandler(response, "Logout successful");
      setIsModalOpen(false);
      clearSessionData();
    } catch (error) {
      globalErrorHandler(error);
    } finally {
      setIsLoading(false);
      navigate(AuthPageUrls.signIn);
    }
  };

  const handleLogoLinkClick = () => {
    clearSelectedChatUserId();
  };

  return (
    <div className="w-full h-full flex items-center justify-between px-2 sm:px-12 bg-base-300">
      {/* Left Logo */}
      <div
        className="font-mono font-semibold tracking-widest relative text-lg animate-moveRightLeft"
        title="Home"
      >
        <ProgressLink to={CommonPageUrls.home} onClick={handleLogoLinkClick}>
          <span className="shine-effect relative">Chatty</span>
        </ProgressLink>
      </div>
      {/* Right */}

      <div className="flex items-center justify-center gap-4" title="Logout">
        <ThemeChange />
        <button type="button" onClick={() => setIsModalOpen(true)}>
          <DoorOpen className="size-4 sm:size-6" />
        </button>
        <ProgressLink to={UserPageUrls.settings} title="Settings">
          <Settings className="size-4 sm:size-6" />
        </ProgressLink>
        <ProgressLink to={getOwnProfileUrl()} title="Profile">
          <User className="size-4 sm:size-6" />
        </ProgressLink>
      </div>
      {/* Logout Modal */}
      {isModalOpen && (
        <Modal
          isModelOpen={isModalOpen}
          dialogQuestion={"Are you sure you want to logout?"}
          handleClose={() => setIsModalOpen(false)}
          isLoading={isLoading}
          handleAccept={handleLogout}
          loadingText={"Logging out..."}
          notLoadingText={"Logout"}
          Icon={LogOut}
        />
      )}
    </div>
  );
};

export default Navbar;
