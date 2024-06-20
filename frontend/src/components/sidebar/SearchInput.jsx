import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { useAuthContext } from "../../context/AuthContext";
import useGetUsers from "../../hooks/useGetUsers";
import useConversation from "../../store/useCoversation";
import toast from "react-hot-toast";
import useAddContact from "../../hooks/useAddContact";

const SearchInput = () => {
  const [search, setSearch] = useState();
  const [dialogOpen, setDialogOpen] = useState(false);
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
      <form className="flex items-center gap-3" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search..."
          className="input input-ghost text-black"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          type="submit"
          className="btn btn-circle btn-ghost bg-transparent text-white"
        >
          <IoSearchSharp className="w-6 h-6 outline-none" />
        </button>
        <button
          type="button"
          onClick={handleListUsers}
          className="btn btn-circle btn-ghost bg-transparent text-white"
        >
          <FaPlus className="w-4 h-4 outline-none" />
        </button>
      </form>
      {dialogOpen ? (
        <UsersDialog users={users} loggedInUser={authUser} />
      ) : (
        <></>
      )}
    </>
  );
};

const UsersDialog = ({ users, loggedInUser }) => {
  const { addContact } = useAddContact();

  let newUsers = [];
  console.log(
    users,
    loggedInUser
  );
  for (let us of users) {
    if (
      !!loggedInUser.contacts &&
      !loggedInUser.contacts.includes(us._id)
    )
      newUsers.push(us);
  }

  return (
    <div className="p-2 bg-white bg-opacity-5 rounded-lg mt-4">
      {!!users?.length &&
        newUsers.map((user) => (
          <div
            key={user._id}
            className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer`}
            onClick={() => addContact(user)}
          >
            <div className="avatar">
              <div className="w-12 rounded-full">
                <img src={user.profilePic} alt="user avatar" />
              </div>
            </div>

            <div className="flex flex-col flex-1">
              <div className="flex gap-3 justify-between">
                <p className="font-bold text-gray-200">{user.fullName}</p>
              </div>
            </div>
          </div>

          // {(idx !== users.length) && <div className="divider my-0 py-0 h-1" />}
        ))}
    </div>
  );
};

export default SearchInput;
