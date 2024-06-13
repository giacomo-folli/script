import Sidebar from "../../components/sidebar/Sidebar";
import ChatContainer from "../../components/messages/ChatContainer";

const Home = () => {
  return (
    <div className="flex sm:h-[450px] md:h-[550px] rounded-xl overflow-hidden bg-black bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-30">
      <Sidebar />
      <ChatContainer />
    </div>
  );
};

export default Home;
