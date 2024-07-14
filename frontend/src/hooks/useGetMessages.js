import { useEffect, useState } from "react";
import useConversation from "../store/useCoversation";
import toast from "react-hot-toast";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selected } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/messages/${selected._id}`);
        const data = await res.json();
        if (data.error) throw new Error(data.error);

        setMessages(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }

      try {
        await fetch("/api/users/resetUnread/" + selected._id);
      } catch (error) {
        toast.error(error.message);
      }
    };

    if (selected?._id) getMessages();
  }, [selected?._id, setMessages]);

  return { messages, loading };
};
export default useGetMessages;
