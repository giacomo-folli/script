import { useSocketContext } from "../../context/SocketContext";
import { isPersonOrGroup } from "../../utils/isPersonOrGroup";
import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../store/useCoversation";

const Conversation = ({ conversation, lastIdx }) => {
  const { selected, setSelected, unread, setUnread } = useConversation();
  const isSelected = selected?._id === conversation._id;
  const { onlineUsers } = useSocketContext();
  const { authUser } = useAuthContext();

  const isOnline = onlineUsers.includes(conversation._id);

  function resetUnreadCounter() {
    const unreadMessages = unread;
    unread[conversation._id] = 0;
    setUnread(unreadMessages);
  }

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${
          isSelected ? " bg-sky-500" : ""
        }`}
        onClick={() => {
          setSelected(conversation);
          resetUnreadCounter();
        }}
      >
        <div className={`avatar ${isOnline ? " online" : ""}`}>
          <div className="w-12 rounded-full">
            <img
              src={isPersonOrGroup(conversation, authUser).profilePic}
              alt="user avatar"
            />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between items-center">
            <p className="font-bold text-gray-200">
              {isPersonOrGroup(conversation, authUser).fullName}
            </p>
            {unread[conversation._id] != 0 && (
              <div className="rounded-full flex items-center justify-center w-4 h-4 btn-circle bg-sky-500 bg-opacity-70">
                <span className="text-xs">{unread[conversation._id]}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {!lastIdx && <div className="divider my-0 py-0 h-1 opacity-0" />}
    </>
  );
};

export default Conversation;
