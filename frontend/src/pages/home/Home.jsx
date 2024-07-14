import ChatContainer from "../../components/messages/ChatContainer";
import Sidebar from "../../components/sidebar/Sidebar";
import useListenGroups from "../../hooks/useListenGroups";

const Home = () => {
  useListenGroups();

  return (
    <div className="flex h-[80dvh] w-[90dvw] rounded-xl overflow-hidden bg-black bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-30">
      <div className="w-[35%] h-full">
        <Sidebar />
      </div>
      <div className="w-[65%] h-full">
        <ChatContainer />
      </div>
    </div>
  );
};

export default Home;
