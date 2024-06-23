import SearchInput from "./SearchInput";
import Conversations from "./Conversations";
import LogoutBtn from "./LogoutBtn";
import { useState } from "react";

const Sidebar = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <div className="border-r border-white border-opacity-30 p-4 flex flex-col">
      <SearchInput dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />

      {!dialogOpen && (
        <>
          <div className="divider px-3"></div>
          <Conversations />
        </>
      )}

      <LogoutBtn />
    </div>
  );
};

export default Sidebar;
