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
  commonPageUrls,
  getProfileUrl,
  userPageUrls,
} from "../../constants/pageUrls";

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
      localStorage.clear();
      setIsModalOpen(false);
      setIsLoading(false);
      navigate(authPageUrls.signIn);
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-between px-12 bg-base-300">
      {/* Left Logo */}
      <div className="font-mono font-semibold tracking-widest relative text-blue-500 text-xl animate-moveRightLeft">
        <Link to={commonPageUrls.home}>
          <span className="shine-effect relative">Chatty</span>
        </Link>
      </div>
      {/* Right */}
      <div className="flex items-center justify-center gap-4" title="Logout">
        <button type="button" onClick={() => setIsModalOpen(true)}>
          <DoorOpen className="size-6" />
        </button>
        <Link to={userPageUrls.settings} title="Settings">
          <Settings className="size-6" />
        </Link>
        <Link to={getProfileUrl(123456)} title="Profile">
          <User className="size-6" />
        </Link>
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
