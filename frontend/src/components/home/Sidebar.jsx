import { Users } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const Sidebar = () => {
  const { userId } = useParams();
  const [selectOnlyOnline, setSelectOnlyOnline] = useState(false);
  const [numOnline, setNumOnline] = useState(0);

  return (
    <div
      className={`h-full relative bg-base-200 overflow-y-auto w-full sm:w-[25%] scroll-hover-show  p-2 flex flex-col gap-2 ${
        userId ? "hidden sm:flex" : "flex"
      }`}
    >
      {/* Header */}
      <div className="sticky top-0 z-10 p-4 flex flex-col gap-2 w-full h-auto bg-neutral rounded-md shadow-md">
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
          <div className="flex text-sm">{numOnline}</div>
        </div>
      </div>

      {/* Users */}
      <div className="w-full h-auto flex flex-col gap-2">
        <div className="w-full h-[100px] bg-yellow-800">user</div>
      </div>
    </div>
  );
};

export default Sidebar;
