import { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";
import useTheme from "../../store/useTheme";
import useSendFile from "../../hooks/useSendFile";

const ChatInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();
  const { sendFile } = useSendFile();
  const { theme } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage("");
  };

  const handleSendFile = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (!file) return;
    await sendFile(file);
  };

  return (
    <form
      className={`px-4 my-3 ${theme ? "" : "text-black"}`}
      onSubmit={handleSubmit}
    >
      <div className="w-full relative">
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
          placeholder="Type something..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <label className="absolute inset-y-0 end-8 flex items-center px-3 cursor-pointer">
          <input
            onChange={handleSendFile}
            id="send-image"
            type="file"
            className="hidden"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13"
            />
          </svg>
        </label>

        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center p-3"
        >
          {loading ? (
            <span className="loading loading-spinner" />
          ) : (
            <BsSend color={theme ? "" : "white"} />
          )}
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
