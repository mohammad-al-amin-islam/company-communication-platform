import React from "react";
import MainNavigationBar from "./main-navigation";
type Child = {
  children: React.ReactNode;
};

const Layout = ({ children }: Child) => {
  return (
    <div className="max-w-[1440px] mx-auto">
      <MainNavigationBar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
