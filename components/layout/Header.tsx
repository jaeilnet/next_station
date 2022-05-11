import Image from "next/image";
import Link from "next/link";
import React from "react";
import classes from "./Header.module.css";
import Logo from "../../public/lgo.png";
import Arrow from "../../public/arrow.png";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  return (
    <div className={classes.container}>
      <div style={{ cursor: "pointer" }} className={classes.logo}>
        <Link href="/" passHref>
          <Image src={Logo} alt="logo" width="30" height="30" />
        </Link>
      </div>
      <div>지하철</div>
      {router.pathname === "/stationDetail/[...params]" && (
        <div className={classes.back}>
          <Link href="/" passHref>
            <Image src={Arrow} alt="arrow" width="30" height="30" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
