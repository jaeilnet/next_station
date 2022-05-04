import React from "react";
import Nav from "./Nav";
import Header from "./Header";
import classes from "./Layout.module.css";

interface Props {
  children: any;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className={classes.container}>
      <Header />
      {children}
      <Nav />
    </div>
  );
};

export default Layout;
