import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CommonPageUrls } from "../../constants/pageUrls";

const ChatContainer = ({ userId }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      //TODO: Fetch chat messages
    } else {
      navigate(CommonPageUrls.home, { replace: true });
    }
  }, [userId]);

  return (
    <div className="w-full sm:w-[75%] h-full flex-col gap-2 items-center justify-center">
      <h1>Chat container</h1>
    </div>
  );
};

export default ChatContainer;
