import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
// import useConversation from "../../store/useCoversation";

const Message = ({ message, isGroup }) => {
  const { authUser } = useAuthContext();
  // const { selected } = useConversation();
  const fromMe = message.senderId._id === authUser._id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";

  // const profilePic = fromMe ? authUser.profilePic : selected?.profilePic;

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={message.senderId.profilePic} alt="user avatar" />
        </div>
      </div>
      <div className={`chat-bubble text-white ${bubbleBgColor} pb-2`}>
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {extractTime(message.createdAt)}
        <span className="capitalize">{isGroup && !fromMe ? message.senderId.fullName : ""}</span>
      </div>
    </div>
  );
};

export default Message;
