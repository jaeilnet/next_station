import Link from "next/link";
import React from "react";
import classes from "./Header.module.css";
import Logo from "../../public/lgo.png";
import Image from "next/image";

interface Props {
  //   children: React.ReactNode;
}

const Header: React.FC<Props> = ({}) => {
  return (
    <div className={classes.container}>
      <div className={classes.HeaderBox}>
        <div className={classes.logo}>
          <Link href="/">
            <Image src={Logo} alt="logo" width="30" height="30" />
          </Link>
        </div>
        <div className={classes.login}>
          <Link href="/login">로그인</Link>
          <div>회원가입</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
