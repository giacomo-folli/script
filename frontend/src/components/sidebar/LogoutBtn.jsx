import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";
import { useAuthContext } from "../../context/AuthContext";

const LogoutBtn = () => {
  const { loading, logout } = useLogout();
  const { authUser } = useAuthContext();
  return (
    <>
      <div className="mt-auto flex justify-between items-center pt-4 border-t-[1px] border-gray-600 border-opacity-30">
        <div className="flex items-center gap-2">
          <img src={authUser.profilePic} alt="profile" className="w-8 h-8" />
          <span>{authUser.username}</span>
        </div>
        <div></div>
        <div>
          {!loading ? (
            <BiLogOut
              onClick={logout}
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
