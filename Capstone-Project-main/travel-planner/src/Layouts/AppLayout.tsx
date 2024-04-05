import React from "react";
import Navigation from "../Navigations/Navigation";
import Footer from "../Footer";


const navigation_items = [
  {
    label: "Home",
    path: "/home"
  },
  {
    label: "My Trips",
    path: "/MyTrips"
  },
  {
    label: "Create Experience",
    path: "/CreateExperience"
  },
  {
    label: "Search",
    path: "/SearchTrips"
  },
  {
    label: "Log out",
    path:"/"
  }
]

interface Props {
  children: React.ReactNode;
}

const AppLayout: React.FC<Props> = ({ children }) => {
  return (
    <div>
      <Navigation navItems={navigation_items}/>
      <main>{children}</main>
      <Footer/>
    </div>
  );
};

export default AppLayout;