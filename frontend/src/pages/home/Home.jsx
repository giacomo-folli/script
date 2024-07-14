import ChatContainer from "../../components/messages/ChatContainer";
import Sidebar from "../../components/sidebar/Sidebar";
import useListenGroups from "../../hooks/useListenGroups";

const Home = () => {
  useListenGroups();

  return (
    <div className="flex sm:h-[450px] md:h-[550px] rounded-xl overflow-hidden bg-black bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-30">
      <Sidebar />
      <ChatContainer />
    </div>
  );
};

export default Home;
