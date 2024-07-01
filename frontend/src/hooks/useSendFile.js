import { useState } from "react";
import useConversation from "../store/useCoversation";
import toast from "react-hot-toast";

const useSendFile = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selected } = useConversation();

  const sendFile = async (file) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      // Post data to Node and Express server:
      const res = await fetch("http://localhost:5000/api/upload/", {
        method: "POST",
        body: formData, // Payload is formData object
      });

      const data = await res.json();
      if (data.error || !data.fileName)
        throw new Error("Error in useSendFile:", data.error);

      const message_res = await fetch(`/api/messages/send/${selected._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: {
            isFile: true,
            fileName: data.fileName,
          },
        }),
      });

      const message_data = await message_res.json();
      if (message_data.error)
        throw new Error("Error in useSendMessage:", data.error);

      setMessages([...messages, message_data]);

      // setMessages([...messages, data]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendFile, loading };
};
export default useSendFile;
