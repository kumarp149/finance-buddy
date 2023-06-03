import React from "react";
import SideBar from "../sidebar/index.jsx";
import Header from "../header/index.jsx";
import "./Layout.css";
import Expenses from "../expenses/Expenses.jsx";

export interface LayoutProps {
  children?: React.ReactNode;
}

const Layout = () => {
  return (
    <div className="layout-container">
      <Header /> 
      <SideBar />

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <div className="page-container">
        <Expenses/>
      </div>
    </div>
  );
};

export default Layout;