import { createContext, useState } from "react";

const SidebarContext = createContext();

const SidebarProvider = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showChat, setShowChat] = useState(true);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
    setShowChat(!showChat);
  };

  return (
    <SidebarContext.Provider value={{ showSidebar, showChat, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export { SidebarProvider, SidebarContext };