import { Loader, Users } from "lucide-react";
import { useEffect, useState } from "react";
import UserService from "../../services/UserService";
import { globalErrorHandler } from "../../helpers/responseHandler";
import SidebarChatUser from "../chat/SidebarChatUser";
import { useChatStore } from "../../store/useChatStore";
import SidebarSkeleton from "../skeletons/SidebarSkeleton";
import { useAuthStore } from "../../store/useAuthStore";
import { useSocketStore } from "../../store/useSocketStore";

const Sidebar = () => {
  //! State
  const [selectOnlyOnline, setSelectOnlyOnline] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  //! Accessing store to perform actions
  const onlineUsers = useSocketStore((store) => store.onlineUsers);
  const setOnlineUsers = useChatStore((store) => store.setOnlineUsers);
  const selectedChatUser = useChatStore((store) => store.selectedChatUser);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await UserService.getUsers();
        setUsers(response.data);
      } catch (err) {
        globalErrorHandler(err, "Error fetching users", null);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div
      className={`h-full relative bg-base-200 overflow-y-auto w-full sm:w-[25%] scroll-hover-show  p-2 flex flex-col gap-2 ${
        selectedChatUser ? "hidden sm:flex" : "flex"
      }`}
    >
      {loading ? (
        // <div className="w-full h-full flex flex-col items-center justify-center">
        //   <Loader className="animate-spin size-8" />
        //   <span className="text-sm">Loading users...</span>
        // </div>
        <SidebarSkeleton />
      ) : (
        <>
          {/* Header */}
          <div className="sticky top-0 z-10 p-4 flex flex-col gap-2 w-full h-auto bg-neutral rounded-md shadow-md text-primary">
            <div className="flex items-center justify-start w-full gap-2">
              <Users size={24} />
              <span className="text-sm md:text-lg font-bold capitalize">
                contacts
              </span>
            </div>

            {/* Checkbox and title for select only online */}
            <div className="w-full h-auto flex items-center justify-between gap-2">
              <div className="w-auto h-auto flex items-center justify-start gap-2">
                <input
                  type="checkbox"
                  id="selectOnlyOnline"
                  checked={selectOnlyOnline}
                  onChange={(e) => setSelectOnlyOnline(e.target.checked)}
                />
                <label htmlFor="selectOnlyOnline" className="text-sm">
                  Online
                </label>
              </div>
              <div className="flex text-sm">{onlineUsers.length}</div>
            </div>
          </div>

          {/* Users */}
          <div className="w-full h-auto flex flex-col gap-2">
            {users?.map((user) => (
              <SidebarChatUser user={user} key={user._id} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
