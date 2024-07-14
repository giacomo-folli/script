import { useEffect } from "react";
import Chat from "./Chat";
import useConversation from "../../store/useCoversation";
import useDeleteGroup from "../../hooks/useDeleteGroup";
import ChatInput from "./ChatInput";
import { TiMessages } from "react-icons/ti";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useAuthContext } from "../../context/AuthContext";

const ChatContainer = () => {
  const { selected, setSelected } = useConversation();
  const { deleteGroup } = useDeleteGroup();

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
          <div className="bg-slate-200 bg-opacity-50 pl-4 pr-2 py-2 mb-2 flex justify-between items-center">
            <div>
              <span className="label-text text-gray-900">To:</span>{" "}
              <span className="text-gray-900 font-bold">
                {selected.fullName || selected.groupName}
              </span>
            </div>
            {selected.isGroup && (
              <div
                onClick={() => {
                  setSelected();
                  deleteGroup(selected._id);
                }}
                className="btn btn-sm btn-ghost rounded-full"
              >
                <MdOutlineDeleteOutline className="text-xl text-center" />
              </div>
            )}
          </div>

          <Chat isGroup={selected.isGroup} />
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
