import MainLayout from "../../layouts/MainLayout";
import { useChatStore } from "../../store/useChatStore";
import ChatContainer from "../../components/chat/ChatContainer";
import Sidebar from "../../components/home/Sidebar";
import { useParams } from "react-router-dom";

const ChatPage = () => {
  const { userId } = useParams();
  const { selectedUser } = useChatStore();
  return (
    <MainLayout>
      <div className="flex items-center justify-center w-full h-full">
        <Sidebar />
        <ChatContainer />
      </div>
    </MainLayout>
  );
};

export default ChatPage;
