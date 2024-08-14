import React from "react";
import FirstHeading from "./firstHeader";
import Sidebar from "./sideBar"

function Layout({ children }) {
  return (
    <div>
      <Sidebar />
      <FirstHeading />
      {children}
    </div>
  );
}

export default Layout;