import Chat from "./Chat";
import ChatInput from "./ChatInput";
import { TiMessages } from "react-icons/ti";
import useConversation from "../../store/useCoversation";
import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
const ChatContainer = () => {
  const { selected, setSelected } = useConversation();

  useEffect(() => {
    // cleanup func (unmounts)
    return () => setSelected(null);
  }, [setSelected]);

  return (
    <div className="md:min-w-[450px] flex flex-col">
      {!selected ? (
        <NoChatSelected />
      ) : (
        <>
          <div className="bg-slate-500 px-4 py-2 mb-2">
            <span className="label-text">To:</span>{" "}
            <span className="text-gray-900 font-bold">{selected.fullName}</span>
          </div>

          <Chat />
          <ChatInput />
        </>
      )}
    </div>
  );
};

export default ChatContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {authUser.fullName} ❄</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
