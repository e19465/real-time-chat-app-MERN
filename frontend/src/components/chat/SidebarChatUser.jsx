import { useChatStore } from "../../store/useChatStore";

const SidebarChatUser = ({ user }) => {
  //! access the state and action from the store
  const setSelectedChatUser = useChatStore(
    (state) => state.setSelectedChatUser
  );
  const selectedChatUser = useChatStore((state) => state.selectedChatUser);

  return (
    <button
      className={`w-full h-auto flex items-center justify-start gap-4 overflow-hidden rounded-md py-2 px-4 cursor-pointer ${
        selectedChatUser?._id === user._id
          ? "bg-primary/70 text-base-300"
          : "bg-base-300"
      }`}
      // to={getChatUrl(user._id)}
      onClick={() => setSelectedChatUser(user)}
    >
      {/* Avatar */}
      <div className="size-16 flex-shrink-0 p-1 border border-primary rounded-full">
        <img
          src={user?.profilePic ? user.profilePic : "/noavatar.webp"}
          className="w-full h-full rounded-full object-cover"
        />
      </div>

      {/* Full Name */}
      <div className="flex flex-col items-start justify-center flex-grow overflow-hidden">
        <h1 className="text-sm font-bold truncate max-w-[250px] md:max-w-full">
          {user?.fullName}
        </h1>
      </div>
    </button>
  );
};

export default SidebarChatUser;
