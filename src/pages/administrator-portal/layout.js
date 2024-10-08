import React from "react";
import FirstHeading from "./firstHeader";
import Sidebar from "./sideBar"
import SecondHeader from './secondHeader'

function Layout({ children }) {
  return (
    <div>
      <Sidebar />
      <FirstHeading />
      <SecondHeader />
      {children}
    </div>
  );
}

export default Layout;