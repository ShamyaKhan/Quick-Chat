import { useContext } from "react";
import assets, { userDummyData } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Sidebar = ({ selectedUser, setSelectedUser }) => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  return (
    <div
      className={`bg-[#8185b2]/10 h-full p-5 rounded-r-xl overflow-y-scroll text-white
        ${selectedUser ? "max-md:hidden" : ""}`}
    >
      <div className="pb-5">
        <div className="flex items-center justify-between">
          <img src={assets.logo} className="max-w-40" />
          <div className="relative py-2 group">
            <img src={assets.menu_icon} className="max-h-5 cursor-pointer" />
            <div
              className="absolute top-full right-0 z-20 w-32 p-5 rounded-md bg-[#282142]
                         border border-gray-600 text-gray-100 hidden group-hover:block"
            >
              <p
                className="text-sm cursor-pointer"
                onClick={() => navigate("/profile")}
              >
                Edit Profile
              </p>
              <hr className="my-2 border-t border-gray-500" />
              <p className="text-sm cursor-pointer" onClick={() => logout()}>
                Logout
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#282142] rounded-full flex items-center gap-2 px-4 py-3 mt-5">
          <img src={assets.search_icon} className="w-3" />
          <input
            type="text"
            className="bg-transparent border-none outline-none text-white text-xs
                     placeholder-[#c8c8c8] flex-1"
            placeholder="Search User..."
          />
        </div>
      </div>

      <div className="flex flex-col">
        {userDummyData.map((user, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedUser(user)}
            className={`relative flex items-center gap-2 p-2 pl-4 rounded cursor-pointer
                      max-sm:text-sm ${selectedUser?._id === user._id && "bg-[#282142]/50"}`}
          >
            <img
              src={user?.profilePic || assets.avatar_icon}
              className="w-8.75 aspect-square rounded-full"
            />
            <div className="flex flex-col leading-5">
              <p>{user.fullName}</p>
              {idx < 3 ? (
                <span className="text-xs text-green-400">Online</span>
              ) : (
                <span className="text-xs text-neutral-400">Offline</span>
              )}
            </div>

            {idx > 2 && (
              <p
                className="absolute top-4 right-4 text-xs w-5 h-5 flex items-center
                           justify-center rounded-full bg-violet-500/50"
              >
                {idx}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
