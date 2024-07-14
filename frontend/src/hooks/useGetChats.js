import { useEffect, useState } from "react";
import useConversation from "../store/useCoversation";
import toast from "react-hot-toast";

const useGetChats = () => {
  const [loading, setLoading] = useState(false);
  const [chats, setChats] = useState([]);
  const { setUnread } = useConversation();

  useEffect(() => {
    const getChats = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/users/contacts");
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }

        console.log(data)
        setChats(data.chats);
        setUnread(data.unread);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getChats();
  }, []);

  return { loading, chats };
};
export default useGetChats;
