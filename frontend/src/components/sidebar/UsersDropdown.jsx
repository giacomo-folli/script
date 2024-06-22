import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import useAddContact from "../../hooks/useAddContact";
import useGetChats from "../../hooks/useGetChats";
import { isPersonOrGroup } from "../../utils/isPersonOrGroup";

const UsersDropdown = ({ users, loggedInUser, theme }) => {
  const { addContact } = useAddContact();

  let newUsers = [];
  const populateNewUsers = () => {
    newUsers = [];
    users.map((us) => {
      // Qua c'è un bug perchè per aggiornare i contatti dell'utente loggato, bisogna uscire e riloggare.
      // Il bug è dovuto dal fatto che le informazioni dell'utente loggato le prende dai cookies e questi non
      // vengono aggiornati quando vengono fatte modifiche sulla rubrica dei contatti!!
      if (!!loggedInUser.contacts && !loggedInUser.contacts.includes(us._id))
        newUsers.push(us);
    });
  };

  populateNewUsers(newUsers);
  useEffect(() => {
    populateNewUsers(newUsers);
  }, []);

  return (
    <>
      <GroupDialog loggedInUser={loggedInUser} theme={theme} />
      <span className="mt-2 text-sm opacity-80">New group</span>
      <button
        className="btn btn-block btn-sm p-2 rounded-lg mt-1"
        onClick={() => document.getElementById("group-modal").showModal()}
      >
        Add a new group
      </button>
      <span className="mt-2 text-sm opacity-80">New contact</span>
      <div className="bg-white bg-opacity-5 rounded-lg mt-1">
        {newUsers?.length ? (
          newUsers.map((user) => (
            <div
              key={user._id}
              className={`flex gap-2 items-center justify-between rounded p-2 cursor-pointer hover:bg-slate-200 hover:bg-opacity-10`}
            >
              <div className="flex items-center gap-2">
                <div className="avatar">
                  <div className="w-12 rounded-full">
                    <img src={user.profilePic} alt="user avatar" />
                  </div>
                </div>

                <div className="flex flex-col flex-1">
                  <div className="flex gap-3 justify-between">
                    <p
                      className={`font-bold ${
                        !theme ? "text-gray-700" : "text-gray-200"
                      }`}
                    >
                      {user.fullName}
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => addContact(user)}
                className="btn btn-circle btn-ghost bg-transparent text-white"
              >
                <FaPlus
                  color={theme ? "" : "#222"}
                  className="w-4 h-4 outline-none"
                />
              </button>
            </div>

            // {(idx !== users.length) && <div className="divider my-0 py-0 h-1" />}
          ))
        ) : (
          <div className="w-full text-center opacity-70">No new users!</div>
        )}
      </div>
    </>
  );
};

const GroupDialog = ({ theme, loggedInUser }) => {
  const [participants, setParticipants] = useState([]);
  const { chats } = useGetChats();
  const onlyChat = chats.filter((ct) => !ct.isGroup);

  const isDisabled = (id) => {
    return participants.includes(id);
  };

  // You can open the modal using document.getElementById('ID').showModal() method
  return (
    <dialog id="group-modal" className="modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button
            className={`btn btn-sm btn-circle btn-ghost absolute right-2 top-2 ${
              theme ? "text-gray-700" : ""
            }`}
          >
            ✕
          </button>
        </form>
        <h3 className={`font-bold text-lg ${theme ? "text-gray-700" : ""}`}>
          Create new group
        </h3>
        <p className={`pb-4 text-xs ${theme ? "text-gray-700" : ""}`}>
          Press ESC key or click on ✕ button to close
        </p>

        {onlyChat ? (
          onlyChat.map((chat) => (
            <div
              key={chat._id}
              className={`flex gap-2 items-center justify-between rounded p-2 cursor-pointer hover:bg-slate-200 hover:bg-opacity-10`}
            >
              <div className="flex items-center gap-2">
                <div className="avatar">
                  <div className="w-12 rounded-full">
                    <img
                      src={isPersonOrGroup(chat, loggedInUser).profilePic}
                      alt="user avatar"
                    />
                  </div>
                </div>

                <div className="flex flex-col flex-1">
                  <div className="flex gap-3 justify-between">
                    <p className="font-bold text-gray-700">
                      {isPersonOrGroup(chat, loggedInUser).fullName}
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                disabled={isDisabled(chat._id)}
                onClick={() => {
                  setParticipants([...participants, chat._id]);
                }}
                className="btn btn-circle btn-ghost bg-transparent text-white disabled:opacity-0"
              >
                <FaPlus color="#222" className="w-4 h-4 outline-none" />
              </button>
            </div>

            // {(idx !== users.length) && <div className="divider my-0 py-0 h-1" />}
          ))
        ) : (
          <div className="w-full text-center opacity-70">No contacts!</div>
        )}
        <div className="w-fit mt-4 ml-auto">
          <button className="px-8 btn btn-block bg-black hover:bg-black text-slate-200">
            Create
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default UsersDropdown;
