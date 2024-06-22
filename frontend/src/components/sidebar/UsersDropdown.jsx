import { useEffect } from "react";
import useAddContact from "../../hooks/useAddContact";
import { FaPlus } from "react-icons/fa6";

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
      <span className="mt-2 text-sm opacity-80">New group</span>
      <div className="btn btn-block btn-sm p-2 rounded-lg mt-1">
        Add a new group
      </div>
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

export default UsersDropdown;
