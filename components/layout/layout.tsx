import React from "react";
import MainNavigationBar from "./main-navigation";
type Child = {
  children: React.ReactNode;
};

const Layout = ({ children }: Child) => {
  return (
    <div>
      <MainNavigationBar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
