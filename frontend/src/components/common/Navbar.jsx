import { useState } from "react";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";
import { LogOut } from "lucide-react";
import {
  globalErrorHandler,
  globalSuccessHandler,
} from "../../helpers/responseHandler";
import { authPageUrls } from "../../constants/pageUrls";

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
    <div className="w-full h-full flex items-center justify-between px-6">
      {/* Left */}
      <div>Chatty</div>
      {/* Right */}
      <div>
        <button type="button" onClick={() => setIsModalOpen(true)}>
          Logout
        </button>
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
