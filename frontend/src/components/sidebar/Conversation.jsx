import { useSocketContext } from "../../context/SocketContext";
import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../store/useCoversation";
import useTheme from "../../store/useTheme";

const Conversation = ({ conversation, emoji, lastIdx }) => {
  const { selected, setSelected } = useConversation();
  const isSelected = selected?._id === conversation._id;
  const { onlineUsers } = useSocketContext();
  const { authUser } = useAuthContext();
  const { theme } = useTheme()

  const isOnline = onlineUsers.includes(conversation._id);

  let receiver = conversation.participants.filter(
    (user) => user._id !== authUser._id
  )[0];

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${
          isSelected ? " bg-sky-500" : ""
        }`}
        onClick={() => setSelected(conversation)}
      >
        <div className={`avatar ${isOnline ? " online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={receiver.profilePic} alt="user avatar" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className={`font-bold ${theme ? "text-gray-200" : "text-gray-800"}`}>{receiver.fullName}</p>
            <span className="text-xl">{emoji}</span>
          </div>
        </div>
      </div>

      {!lastIdx && <div className="divider my-0 py-0 h-1 opacity-0" />}
    </>
  );
};

export default Conversation;
