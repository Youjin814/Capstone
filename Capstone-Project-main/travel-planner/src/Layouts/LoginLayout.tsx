import React from "react";
import Footer from "../Footer";
import LoginNavigation from "../Navigations/LoginNavigation";
import Navigation from "../Navigations/Navigation";

interface Props {
  children: React.ReactNode;
}

const LoginLayout: React.FC<Props> = ({ children }) => {
  return (
    <div>
        <LoginNavigation/>
      <main>{children}</main>
      <Footer/>
    </div>
  );
};

export default LoginLayout;