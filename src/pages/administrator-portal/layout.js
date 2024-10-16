import React from "react";
import FirstHeading from "./firstHeader";
import Sidebar from "./sideBar"
import SecondHeader from './secondHeader'

function Layout({ children, searchQuery, setSearchQuery }) {
  return (
    <div>
      <Sidebar />
      <FirstHeading searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <SecondHeader />
      {children}
    </div>
  );
}

export default Layout;