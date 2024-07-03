import DocIcon from "./DocIcon";
import { extractTime } from "../../utils/extractTime";

const FileMessage = ({
  chatClassName,
  message,
  bubbleBgColor,
  isGroup,
  fromMe,
}) => {
  return message.type.split("/")[0] == "image" ? (
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
          {message.type.split("/")[0] == "image" ? (
            <img
              src={"http://localhost:5000/api/upload/" + message.fileName}
              className="w-32 h-32 object-cover rounded-lg filter brightness-75"
            />
          ) : (
            <div className="w-32 h-32"></div>
          )}

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
    <div
      className={
        "flex gap-3 items-center py-2 " +
        (chatClassName == "chat-end" ? "flex-row-reverse" : "")
      }
    >
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={message.senderId.profilePic} alt="user avatar" />
        </div>
      </div>
      <div className="rounded-lg w-full max-w-40">
        <audio controls>
          <source
            src={"http://localhost:5000/api/upload/" + message.fileName}
          />
        </audio>
        <div className="chat-footer opacity-50 text-xs text-right mt-0.5 gap-1 items-center">
          {extractTime(message.createdAt)}
          <span className="ml-auto capitalize">
            {isGroup && !fromMe ? message.senderId.fullName : ""}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FileMessage;
