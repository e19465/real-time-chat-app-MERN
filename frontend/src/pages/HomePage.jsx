import NoChatSelected from "../components/home/NoChatSelected";
import Sidebar from "../components/common/Sidebar";
import MainLayout from "../layouts/MainLayout";
import ChatContainer from "../components/chat/ChatContainer";
import { useChatStore } from "../store/useChatStore";

const HomePage = () => {
  //! access the state and action from the store
  const selectedChatUserId = useChatStore((state) => state.selectedChatUserId);
  return (
    <MainLayout>
      <div className="flex items-center justify-center w-full h-full">
        <Sidebar />
        {selectedChatUserId ? (
          <ChatContainer userId={selectedChatUserId} />
        ) : (
          <NoChatSelected />
        )}
      </div>
    </MainLayout>
  );
};

export default HomePage;
