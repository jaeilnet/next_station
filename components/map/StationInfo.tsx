import dayjs from "dayjs";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import { row } from ".";
import { RealTimeArrivalListType } from "../constant";
import classes from "./StationInfo.module.css";

interface Props {
  data: RealTimeArrivalListType[];
  id: any;
}

const StationInfo: React.FC<Props> = ({ data, id }) => {
  const router = useRouter();

  const arriveScheduledTime = useCallback((date: string) => {
    return Math.floor(+date / 60) + "분전";
  }, []);

  const arriveDate = useCallback((date: string) => {
    return dayjs().add(Number(date), "second").format("HH:mm") + "분";
  }, []);

  const handleDetail = () => {
    const filter = id.filter((e: row) => e.ROUTE === "2호선");

    router.push(
      `/stationDetail/${encodeURI(filter[0].STATN_NM)}/${filter[0].STATN_ID}`
    );
  };

  const stationColor = (route: string) => {
    switch (route) {
      case "1호선":
        return "#0D347F";
      case "2호선":
        return "#3B9F37";
      case "3호선":
        return "#3B9F37";
      case "4호선":
        return "#3165A8";
      case "5호선":
        return "#703E8C";
      case "6호선":
        return "#904D23";
      case "7호선":
        return "#5B692E";
      case "8호선":
        return "#C82363";
      case "9호선":
        return "#B39627";
      case "신분당선":
        return "#971F2D";
      case "분당선":
        return "#DBA829";
      default:
        return "#e7e7e7";
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.title}>내 위치에서 가장 가까운 역은?</div>
      <div
        style={{ background: stationColor(id[0].ROUTE) }}
        className={classes.station}
        onClick={() => handleDetail()}
      >
        {id[0].ROUTE + " " + id[0].STATN_NM}
      </div>
      {data.length > 0 ? (
        data.map((e: RealTimeArrivalListType, i: number) => (
          <div className={classes.statinList} key={i}>
            <div className={classes.titleBox}>
              <p>{`${e.bstatnNm}행`}</p>
              {e.barvlDt > "0" ? (
                <>
                  <p className={classes.desc}>도착 예정</p>
                  <p className={classes.desc}>{arriveDate(e.barvlDt)}</p>
                  <p className={classes.desc}>
                    {arriveScheduledTime(e.barvlDt)}
                  </p>
                </>
              ) : (
                <p className={classes.desc}>{e.arvlMsg2}</p>
              )}
            </div>
            <div className={classes.detail}>
              <p>현재위치</p>
              <p className={classes.desc}>{e.arvlMsg3}</p>
              <p>열차번호</p>
              <p className={classes.desc}>{`${e.btrainNo}호`}</p>
            </div>

            {e.btrainSttus !== null && (
              <div>
                <p> 열차종류 (급행,ITX)</p>
                <p className={classes.desc}>{e.btrainSttus}</p>
              </div>
            )}
          </div>
        ))
      ) : (
        <div className={classes.warring}>현재 운행 중인 열차가 없습니다</div>
      )}
    </div>
  );
};

export default StationInfo;
