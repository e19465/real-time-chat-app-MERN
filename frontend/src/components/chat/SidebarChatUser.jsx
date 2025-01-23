import { useParams } from "react-router-dom";
import { ProgressLink } from "../nprogress/NProgressHandler";
import { getChatUrl } from "../../constants/pageUrls";

const SidebarChatUser = ({ user }) => {
  const { userId } = useParams();

  return (
    <ProgressLink
      className={`w-full h-auto flex items-center justify-start gap-4 overflow-hidden rounded-md py-2 px-4 cursor-pointer ${
        userId === user._id ? "bg-primary/70 text-base-300" : "bg-base-300"
      }`}
      to={getChatUrl(user._id)}
    >
      {/* Avatar */}
      <div className="size-16 flex-shrink-0 p-1 border border-base-300 rounded-full">
        <img
          src={user?.profilePic ? user.profilePic : "/noavatar.webp"}
          className="w-full h-full rounded-full object-cover"
        />
      </div>

      {/* Full Name */}
      <div className="flex flex-col items-start justify-center flex-grow overflow-hidden">
        <h1 className="text-sm font-bold truncate max-w-[150px] md:max-w-full">
          {user?.fullName}
        </h1>
      </div>
    </ProgressLink>
  );
};

export default SidebarChatUser;
