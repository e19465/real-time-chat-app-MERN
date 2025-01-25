import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CommonPageUrls } from "../../constants/pageUrls";
import ChatHeader from "./ChatHeader";

const ChatContainer = ({ user }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      //TODO: Fetch chat messages
    } else {
      navigate(CommonPageUrls.home, { replace: true });
    }
  }, [user]);

  return (
    <div className="w-full sm:w-[75%] h-full flex-col gap-2 items-center justify-center">
      <ChatHeader user={user} />
    </div>
  );
};

export default ChatContainer;
