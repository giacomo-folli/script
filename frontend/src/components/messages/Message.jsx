import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import DocIcon from "./DocIcon";
// import useConversation from "../../store/useCoversation";

const Message = ({ message, isGroup }) => {
  const { authUser } = useAuthContext();
  // const { selected } = useConversation();
  const fromMe = message.senderId._id === authUser._id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const bubbleBgColor = fromMe ? "bg-sky-500" : "";

  // const profilePic = fromMe ? authUser.profilePic : selected?.profilePic;

  return message.isFile ? (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={message.senderId.profilePic} alt="user avatar" />
        </div>
      </div>
      <div
        className={`flex items-center justify-center gap-2 rounded-2xl text-white ${bubbleBgColor} cursor-pointer`}
      >
        <a
          className="btn btn-ghost py-3 relative h-fit rounded-xl"
          href={"http://localhost:5000/api/upload/" + message.fileName}
        >
          <img
            src={"http://localhost:5000/api/upload/" + message.fileName}
            className="w-32 h-32 object-cover rounded-lg filter brightness-75"
          />

          <div className="absolute top-[35%] w-full flex flex-col gap-2 items-center justify-center">
            <span className="">
              <DocIcon />
            </span>
            {message.fileName.split("-").splice(1)}
          </div>
        </a>
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {extractTime(message.createdAt)}
        <span className="capitalize">
          {isGroup && !fromMe ? message.senderId.fullName : ""}
        </span>
      </div>
    </div>
  ) : (
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
        <span className="capitalize">
          {isGroup && !fromMe ? message.senderId.fullName : ""}
        </span>
      </div>
    </div>
  );
};

export default Message;
