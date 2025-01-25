import { XIcon } from "lucide-react";
import { useChatStore } from "../../store/useChatStore";
import { ProgressLink } from "../nprogress/NProgressHandler";
import { getOtherProfileUrl } from "../../constants/pageUrls";

const ChatHeader = ({ user }) => {
  //! Accessing store to perform actions
  const clearSelectedChatUser = useChatStore(
    (state) => state.clearSelectedChatUser
  );

  return (
    <div className="w-full h-auto flex items-center justify-between p-2 border-b border-primary bg-primary/10">
      {/* Profile Picture */}
      <ProgressLink
        className="flex items-center justify-center gap-2"
        to={getOtherProfileUrl(user?._id)}
      >
        <img
          src={user?.profilePic || "/noavatar.webp"}
          alt="profile picture"
          className="border border-primary rounded-full size-8 object-cover"
        />
        <div className="flex flex-col items-start justify-center flex-grow overflow-hidden">
          <h1 className="text-sm font-bold truncate max-w-[150px] md:max-w-full">
            {user?.fullName}
          </h1>
        </div>
      </ProgressLink>

      {/* Close button */}
      <button
        className="size-5 flex items-center justify-center hover:bg-primary cursor-pointer border border-primary border-opacity-25"
        onClick={clearSelectedChatUser}
      >
        <XIcon className="size-4" />
      </button>
    </div>
  );
};

export default ChatHeader;
