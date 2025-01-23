import { useState } from "react";
import Modal from "./Modal";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";
import { LogOut, DoorOpen, User, Settings } from "lucide-react";
import {
  globalErrorHandler,
  globalSuccessHandler,
} from "../../helpers/responseHandler";
import {
  authPageUrls,
  commonPageUrls,
  getOwnProfileUrl,
  userPageUrls,
} from "../../constants/pageUrls";
import { ProgressLink } from "../nprogress/NProgressHandler";

const Navbar = () => {
  //! Hooks
  const navigate = useNavigate();

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
    } catch (error) {
      globalErrorHandler(error);
    } finally {
      AuthService.clearSessionData();
      setIsModalOpen(false);
      setIsLoading(false);
      navigate(authPageUrls.signIn);
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-between px-12 bg-base-300">
      {/* Left Logo */}
      <div className="font-mono font-semibold tracking-widest relative text-blue-500 text-lg animate-moveRightLeft">
        <ProgressLink to={commonPageUrls.home}>
          <span className="shine-effect relative">Chatty</span>
        </ProgressLink>
      </div>
      {/* Right */}
      <div className="flex items-center justify-center gap-4" title="Logout">
        <button type="button" onClick={() => setIsModalOpen(true)}>
          <DoorOpen className="size-6" />
        </button>
        <ProgressLink to={userPageUrls.settings} title="Settings">
          <Settings className="size-6" />
        </ProgressLink>
        <ProgressLink to={getOwnProfileUrl()} title="Profile">
          <User className="size-6" />
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
