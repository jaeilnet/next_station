import React from "react";
import classes from "./Header.module.css";

interface Props {
  //   children: React.ReactNode;
}

const Header: React.FC<Props> = ({}) => {
  return (
    <div className={classes.container}>
      <div className={classes.HeaderBox}>
        <div className={classes.logo}>
          <div>로고</div>
          <div>이미지</div>
        </div>
        <div className={classes.login}>
          <div>로그인</div>
          <div>회원가입</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
