import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { useAuthContext } from "../../context/AuthContext";
import useGetUsers from "../../hooks/useGetUsers";
import useConversation from "../../store/useCoversation";
import toast from "react-hot-toast";
import UsersDropdown from "./UsersDropdown";

const SearchInput = ({ dialogOpen, setDialogOpen }) => {
  const [search, setSearch] = useState();
  const { users } = useGetUsers();
  const { authUser } = useAuthContext();
  const { setSelected } = useConversation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3)
      return toast.error("Search term must be at least 3 characters long");

    const conversation = users.find((c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      setSelected(conversation);
      setSearch("");
    } else {
      toast.error("No user found");
    }
  };

  const handleListUsers = async (e) => {
    e.preventDefault();
    setDialogOpen(!dialogOpen);
  };

  return (
    <>
      <form className="w-full flex items-center gap-2" onSubmit={handleSubmit}>
        <button
          type="button"
          onClick={handleListUsers}
          className="btn btn-circle btn-ghost bg-transparent text-white"
        >
          <FaPlus className="w-4 h-4 outline-none" />
        </button>
      </form>
      {dialogOpen && (
        <UsersDropdown
          users={users}
          loggedInUser={authUser}
          toggleDialog={setDialogOpen}
        />
      )}
    </>
  );
};

export default SearchInput;
