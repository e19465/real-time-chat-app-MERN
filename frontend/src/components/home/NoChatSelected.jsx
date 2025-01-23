import { MessageSquare } from "lucide-react";
import React from "react";

const NoChatSelected = () => {
  return (
    <div className="w-[75%] h-full flex-col gap-2 items-center justify-center hidden sm:flex">
      {/* LOGO */}
      <div className="flex items-center justify-center">
        <MessageSquare size={100} />
      </div>

      {/* TITLE */}
      <h1 className="text-2xl font-bold text-center">Welcome to Chatty</h1>

      {/* TEXT */}
      <p className="text-center">Please select a chat to start messaging</p>
    </div>
  );
};

export default NoChatSelected;
