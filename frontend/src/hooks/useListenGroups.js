import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";

const useListenGroups = () => {
  const { socket } = useSocketContext();

  useEffect(() => {
    socket?.on("newGroup", (newGroup) => {
      console.log(newGroup);
      confirm("You've been added to a new group");
    });

    return () => socket?.off("newGroup");
  }, [socket]);
};

export default useListenGroups;
