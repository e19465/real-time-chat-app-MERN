import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CommonPageUrls } from "../../constants/pageUrls";
import ChatHeader from "./ChatHeader";
import Chat from "./Chat";
import SendMessage from "./SendMessage";

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
    <div className="w-full sm:w-[75%] h-full flex flex-col items-center justify-center">
      <ChatHeader user={user} />
      <Chat user={user} />
      <SendMessage user={user} />
    </div>
  );
};

export default ChatContainer;
