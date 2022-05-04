import Link from "next/link";
import React from "react";
import classes from "./Nav.module.css";

interface Props {
  //   children: React.ReactNode;
}

const Nav: React.FC<Props> = ({}) => {
  return (
    <div className={classes.container}>
      <div className={classes.HeaderBox}>
        <div>
          <Link href="/">홈</Link>
        </div>
        <div className={classes.login}>
          <Link href="/chat">채팅</Link>
          <Link href="/login">로그인</Link>
        </div>
      </div>
    </div>
  );
};

export default Nav;
