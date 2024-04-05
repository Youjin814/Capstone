import React from "react";
import { Link } from "react-router-dom";
import '../App.css';

interface NavItem {
  label: string;
  path: string;
}

interface Props {
  navItems: NavItem[];
}

const Navigation: React.FC<Props> = ({ navItems }) => {
  return (
    <div id="navbar">
      <div id="title">
        Travel Planner
      </div>
      <div id="navdiv">
        <nav>
          <ul>
            {navItems.map((navItem) => (
              <li key={navItem.path}>
                <Link to={navItem.path}>{navItem.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navigation;