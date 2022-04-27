import dayjs from "dayjs";
import React, { useState } from "react";
import { RealTimeArrivalListType } from "../constant";
import classes from "./StationInfo.module.css";

interface Props {
  data: RealTimeArrivalListType[];
}

interface DetailState {
  index: Number | null;
  show: boolean;
}

const StationInfo: React.FC<Props> = ({ data }) => {
  const [detail, setDetail] = useState<any>({
    index: null,
    show: false,
  });

  console.log(data, "data");

  // const arriveInfo = (type: string) => {
  //   switch (type) {
  //     case "0":
  //       return "진입";
  //     case "1":
  //       return "도착";
  //     case "2":
  //       return "출발";
  //     case "3":
  //       return "전역 출발";
  //     case "4":
  //       return "전역 진입";
  //     case "5":
  //       return "전역 도착";
  //     case "99":
  //       return "운행중";
  //     default:
  //       return;
  //   }
  // };

  const arriveScheduledTime = (date: string) => {
    return Math.floor(+date / 60) + "분 소요예정";
  };

  const arriveDate = (date: string) => {
    return dayjs(date).format("HH:mm:ss");
  };

  const arriveUpdnLine = (type: string) => {
    switch (type) {
      case "1":
        return "외선";
      case "0":
        return "내선";
      default:
        return type;
    }
  };

  return (
    <div className={classes.container}>
      {data.map((e: RealTimeArrivalListType, i: number) => (
        <div className={classes.statinList} key={i}>
          <div>
            <p>{`${e.statnNm}역`}</p>
            <p className={classes.station}>{e.trainLineNm}</p>
            <button onClick={() => setDetail({ index: i, show: !detail.show })}>
              자세히보기
            </button>
          </div>
          {/* <li>{arriveInfo(e.arvlCd)}</li> */}
          {detail.show && detail.index === i ? (
            <>
              <div className={classes.position}>
                <p>현재위치</p>
                <p className={classes.desc}>{e.arvlMsg3}</p>
                {e.barvlDt > "0" ? (
                  <>
                    <p>도착 예정시간</p>
                    <p className={classes.desc}>{arriveDate(e.recptnDt)}</p>
                    <p className={classes.desc}>
                      {arriveScheduledTime(e.barvlDt)}
                    </p>
                  </>
                ) : (
                  <>
                    <p>열차상태</p>
                    <p className={classes.desc}>{e.arvlMsg2}</p>
                  </>
                )}
              </div>
              <div>
                <p>최종 목적지</p>
                <p className={classes.desc}>{e.bstatnNm}</p>
              </div>
              <div>
                <p>내리는 방향</p>
                <p className={classes.desc}>{e.subwayHeading}</p>
              </div>
              <div>
                <p> 상하행선구분</p>
                <p className={classes.desc}>{arriveUpdnLine(e.updnLine)}</p>
              </div>
              {e.btrainSttus !== null && (
                <div>
                  <p> 열차종류 (급행,ITX)</p>
                  <p className={classes.desc}>{e.btrainSttus}</p>
                </div>
              )}
            </>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default StationInfo;

{
  /* <li>
            <p>열차 번호</p>
            <p>{e.btrainNo}</p>
          </li> */
}
