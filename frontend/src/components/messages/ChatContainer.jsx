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
  const { authUser } = useAuthContext();
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
          <div className="bg-opacity-50 pl-4 pr-2 py-2 mb-2 flex justify-between items-center">
            <div>
              <span className="label-text text-white">To:</span>{" "}
              <span className="text-white font-bold">
                {selected.isGroup
                  ? selected.groupName
                  : selected.participants.filter(
                      (p) => p._id.toString() != authUser._id.toString()
                    )[0].fullName}
              </span>
            </div>
            {selected.isGroup &&
              selected.admin?.toString() == authUser._id.toString() && (
                <div
                  onClick={() => {
                    if (confirm("Are you sure you want to delete this group")) {
                      setSelected();
                      deleteGroup(selected._id);
                    }
                  }}
                  className="btn btn-sm btn-ghost rounded-full text-black hover:text-white bg-slate-50 hover:bg-red-500 bg-opacity-70"
                >
                  <MdOutlineDeleteOutline className="text-lg" />
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
