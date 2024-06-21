import useGetChats from "../../hooks/useGetChats";
import Conversation from "./Conversation";

const Conversations = () => {
  const { loading, chats } = useGetChats();
  return (
    <div className="pb-2 flex flex-col overflow-auto">
      {chats.map((chat, idx) => (
        <Conversation
          key={chat._id}
          conversation={chat}
          lastIdx={idx === chats.length - 1}
        />
      ))}

      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}
    </div>
  );
};

export default Conversations;
