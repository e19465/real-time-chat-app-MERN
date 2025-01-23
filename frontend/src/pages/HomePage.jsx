import NoChatSelected from "../components/home/NoChatSelected";
import Sidebar from "../components/home/Sidebar";
import MainLayout from "../layouts/MainLayout";
import { useChatStore } from "../store/useChatStore";
import ChatContainer from "../components/chat/ChatContainer";

const HomePage = () => {
  return (
    <MainLayout>
      <div className="flex items-center justify-center w-full h-full">
        <Sidebar />
        <NoChatSelected />
      </div>
    </MainLayout>
  );
};

export default HomePage;
