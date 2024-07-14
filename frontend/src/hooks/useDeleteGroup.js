import { useState } from "react";
import toast from "react-hot-toast";

const useDeleteGroup = () => {
  const [loading, setLoading] = useState(false);

  const deleteGroup = async (groupId) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/groups/delete/${groupId}`);
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      console.log("GROUP DELETED");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, deleteGroup };
};
export default useDeleteGroup;
