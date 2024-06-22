import ChatContainer from "../../components/messages/ChatContainer";
import Sidebar from "../../components/sidebar/Sidebar";
import useTheme from "../../store/useTheme";

const Home = () => {
  const { theme } = useTheme();
  return (
    <div
      className={`flex sm:h-[450px] md:h-[550px] rounded-xl overflow-hidden ${
        theme ? "bg-black" : "bg-transparent text-black"
      } bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-30`}
    >
      <Sidebar />
      <ChatContainer />
    </div>
  );
};

export default Home;
