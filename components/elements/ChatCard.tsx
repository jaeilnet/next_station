import Image from "next/image";
import React from "react";
import classes from "./ChatCard.module.css";
import image from "../../public/lgo.png";
import { useRouter } from "next/router";

const ChatCard = () => {
  const router = useRouter();

  return (
    <div className={classes.container}>
      <div className={classes.grid}>
        <div className={classes.image}>
          <Image src={image} width={50} height={50} alt="지하철" />
        </div>
        <div className={classes.text}>
          <div className={classes.title}>
            <span>2호선 선릉</span>
            <p>성수행</p>
            <p>1111호</p>
          </div>
          <div className={classes.desc}>내용</div>
        </div>
      </div>
      <button
        className={classes.button}
        onClick={() => router.push("/chat/room/1")}
      >
        버튼
      </button>
    </div>
  );
};

export default ChatCard;
