import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../store/useCoversation";

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
        console.log(data)
        setMessages(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (selected?._id) getMessages();
  }, [selected?._id, setMessages]);
  return { messages, loading };
};

export default useGetMessages;
