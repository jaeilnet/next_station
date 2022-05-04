import Image from "next/image";
import Link from "next/link";
import React from "react";
import classes from "./Header.module.css";
import Logo from "../../public/lgo.png";

const Header = () => {
  return (
    <div className={classes.container}>
      <div className={classes.logo}>
        <Link href="/" passHref>
          <Image src={Logo} alt="logo" width="30" height="30" />
        </Link>
      </div>
      <div>지하철</div>
    </div>
  );
};

export default Header;
