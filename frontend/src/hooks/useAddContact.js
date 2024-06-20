import { useState } from "react";
import toast from "react-hot-toast";

const useAddContact = () => {
  const [loading, setLoading] = useState(false);

  const addContact = async (user) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/users/addContact/${user._id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  return { addContact, loading };
};
export default useAddContact;
