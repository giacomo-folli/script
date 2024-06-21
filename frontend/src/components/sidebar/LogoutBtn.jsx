import { BiLogOut } from "react-icons/bi";
import { IoColorPaletteOutline } from "react-icons/io5";
import useLogout from "../../hooks/useLogout";
import { useAuthContext } from "../../context/AuthContext";
import useTheme from "../../store/useTheme";

const LogoutBtn = () => {
  const { loading, logout } = useLogout();
  const { authUser } = useAuthContext();
  const { theme, setTheme } = useTheme();
  return (
    <>
      <div className="mt-auto flex justify-between items-center pt-4 border-t-[1px] border-gray-600 border-opacity-30">
        <div className="flex items-center gap-2">
          <img src={authUser.profilePic} alt="profile" className="w-8 h-8" />
          <span>{authUser.username}</span>
        </div>
        <div className="flex items-center gap-3">
          <div>
            <IoColorPaletteOutline
              onClick={() => setTheme(!theme)}
              color={theme ? "" : "#222"}
              className="w-5 h-5 text-white cursor-pointer"
            />
          </div>
          {!loading ? (
            <BiLogOut
              onClick={logout}
              color={theme ? "" : "#222"}
              className="w-6 h-6 text-white cursor-pointer"
            />
          ) : (
            <span className="loading loading-spinner"></span>
          )}
        </div>
      </div>
    </>
  );
};

export default LogoutBtn;
