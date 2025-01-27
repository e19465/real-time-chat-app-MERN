import { Search, Users } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import UserService from "../../services/UserService";
import { globalErrorHandler } from "../../helpers/responseHandler";
import SidebarChatUser from "../chat/SidebarChatUser";
import { useChatStore } from "../../store/useChatStore";
import SidebarSkeleton from "../skeletons/SidebarSkeleton";
import { useSocketStore } from "../../store/useSocketStore";

const Sidebar = () => {
  //! State
  const [selectOnlyOnline, setSelectOnlyOnline] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  //! Accessing store to perform actions
  const onlineUsers = useSocketStore((store) => store.onlineUsers);
  const selectedChatUser = useChatStore((store) => store.selectedChatUser);

  //! Fetch users once on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
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

  //! Memoize filtered users to avoid unnecessary re-renders
  const filteredUsers = useMemo(() => {
    return selectOnlyOnline
      ? users.filter((user) => onlineUsers.includes(user._id))
      : users;
  }, [selectOnlyOnline, users, onlineUsers]);

  //! Filter users based on search query
  const filteredUsersSearch = useMemo(() => {
    const trimmedSearch = search.trim(); // Trim the search value
    return filteredUsers?.filter((user) =>
      user?.fullName?.toLowerCase()?.includes(trimmedSearch?.toLowerCase())
    );
  }, [search, filteredUsers]);

  return (
    <div
      className={`h-full relative bg-base-200 overflow-y-auto w-full sm:w-[25%] scroll-hover-show p-2 flex flex-col gap-2 ${
        selectedChatUser ? "hidden sm:flex" : "flex"
      }`}
    >
      {loading ? (
        <SidebarSkeleton />
      ) : (
        <>
          {/* Header */}
          <div className="sticky top-0 z-10 p-4 flex flex-col gap-2 w-full h-auto bg-neutral rounded-md shadow-md text-primary">
            <div className="flex items-center gap-2">
              <Users size={24} />
              <span className="text-sm md:text-lg font-bold capitalize">
                Contacts
              </span>
            </div>

            {/* Checkbox and title for select only online */}
            <div className="flex items-center justify-between gap-2">
              <label
                htmlFor="selectOnlyOnline"
                className="flex items-center gap-2"
              >
                <input
                  type="checkbox"
                  id="selectOnlyOnline"
                  checked={selectOnlyOnline}
                  onChange={(e) => setSelectOnlyOnline(e.target.checked)}
                />
                <span className="text-sm">Online</span>
              </label>
              <span className="text-sm">{onlineUsers.length}</span>
            </div>

            <div className="w-full h-auto">
              <label className="input input-bordered flex items-center gap-2 h-[40px] mt-2">
                <input
                  type="text"
                  className="grow"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Search size={16} />
              </label>
            </div>
          </div>

          {/* Users */}
          <div className="flex flex-col gap-2">
            {filteredUsersSearch.map((user) => (
              <SidebarChatUser user={user} key={user._id} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
