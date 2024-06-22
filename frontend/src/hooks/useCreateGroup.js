import { useState } from "react";
import toast from "react-hot-toast";

const useCreateGroup = () => {
  const [loading, setLoading] = useState(false);

  const createGroup = async (participants) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/groups/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ participants }),
      });

      const data = await res.json();
      if (data.error) throw new Error("Error in createGroup:", data.error);
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  return { createGroup, loading };
};
export default useCreateGroup;
