import React from "react";
import Footer from "../Footer";
import LoginNavigation from "../Navigations/LoginNavigation";
import Navigation from "../Navigations/Navigation";
import LandingNavigation from "../Navigations/LandingNavigation";

interface Props {
  children: React.ReactNode;
}

const LandingLayout: React.FC<Props> = ({ children }) => {
  return (
    <div>
        <LandingNavigation/>
        <main>{children}</main>
        <Footer/>
    </div>
  );
};

export default LandingLayout;