import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";

const useListenGroups = () => {
  const { socket } = useSocketContext();

  useEffect(() => {
    socket?.on("newGroup", () => {
      window.location.reload();
    });

    return () => socket?.off("newGroup");
  }, [socket]);
};

export default useListenGroups;
