import dayjs from "dayjs";
import React from "react";
import { RealTimeArrivalListType } from "../constant";
import classes from "./StationInfo.module.css";

interface Props {
  data: RealTimeArrivalListType[];
}

const StationInfo: React.FC<Props> = ({ data }) => {
  const arriveInfo = (type: string) => {
    switch (type) {
      case "0":
        return "진입";
      case "1":
        return "도착";
      case "2":
        return "출발";
      case "3":
        return "전역 출발";
      case "4":
        return "전역 진입";
      case "5":
        return "전역 도착";
      case "99":
        return "운행중";
      default:
        return;
    }
  };

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
      {data.map((e: any, i: number) => (
        <ul className={classes.statinList} key={i}>
          <li>
            <p>지하철 역명</p>
            <p>{e.statnNm}</p>
          </li>
          <li>{arriveInfo(e.arvlCd)}</li>
          <li>
            <p>열차상태</p>
            <p>{e.arvlMsg2}</p>
          </li>
          <li>
            <p>현재위치</p>
            <p>{e.arvlMsg3}</p>
          </li>
          {e.barvlDt > 0 && (
            <li>
              <p>도착 예정시간</p>
              <p>{arriveScheduledTime(e.barvlDt)}</p>
            </li>
          )}
          <li>
            <p>최종 목적지</p>
            <p>{e.bstatnNm}</p>
          </li>
          <li>
            <p>열차 번호</p>
            <p>{e.btrainNo}</p>
          </li>

          <li>
            <p> 도착 예정시간</p>
            <p>{arriveDate(e.recptnDt)}</p>
          </li>

          <li>
            <p>내리는 방향</p>
            <p>{e.subwayHeading}</p>
          </li>

          <li>
            <p> 상하행선구분</p>
            <p>{arriveUpdnLine(e.updnLine)}</p>
          </li>
          <li>
            <p> 도착지방면</p>
            <p>{e.trainLineNm}</p>
          </li>
          {e.btrainSttus !== null && (
            <li>
              <p> 열차종류 (급행,ITX)</p>
              <p>{e.btrainSttus}</p>
            </li>
          )}
          {/* <li>
            <p> 도착예정열차순번</p>
            <p>{e.ordkey}</p>
          </li> */}
          {/* <li>
            <p>지하철 호선 id</p>
            <p>{e.subwayId}</p>
          </li> */}
          {/* <li>
            <p> 연계호선ID (1002, 1007 등 연계대상 호상ID)</p>
            <p>{e.subwayList}</p>
          </li> */}
          {/* <li>
            <p>이전지하철역ID</p>
            <p>{e.statnFid}</p>
          </li>
          <li>
            <p>지하철역ID</p>
            <p>{e.statnId}</p>
          </li>
          <li>
            <p>연계지하철역 id</p>
            <p>{e.statnList}</p>
          </li>
          <li>
            <p>다음지하철역ID </p>
            <p>{e.statnTid}</p>
          </li> */}
          {/* <li>
            <p>종착역 id</p>
            <p>{e.bstatnId}</p>
          </li> */}
        </ul>
      ))}
    </div>
  );
};

export default StationInfo;
