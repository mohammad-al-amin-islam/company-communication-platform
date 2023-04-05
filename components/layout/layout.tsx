import React from "react";
import MainNavigationBar from "./main-navigation";
import Footer from "../shared/footer";
type Child = {
  children: React.ReactNode;
};

const Layout = ({ children }: Child) => {
  return (
    <div className="max-w-[1440px] mx-auto">
      <MainNavigationBar />
      <main>{children}</main>
      <Footer year={2023}/>
    </div>
  );
};

export default Layout;
