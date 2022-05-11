import React, { useState } from "react";
import classes from "./StationDetail.module.css";
import { API_get } from "../../components/common/api";
import dayjs from "dayjs";
import BarChart from "../../components/chart/BarChart";

const StationDetail = ({
  incourseLast,
  outcourseLast,
  stationPassengerData,
}: any) => {
  console.log(stationPassengerData);

  const passengerCount = stationPassengerData.CardSubwayTime.row[0];

  const [passengerData, setPassengerData] = useState({
    labels: [4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24],
    datasets: [
      {
        label: ["승차 인원"],
        data: [
          passengerCount.FOUR_RIDE_NUM,
          passengerCount.SIX_RIDE_NUM,
          passengerCount.EIGHT_RIDE_NUM,
          passengerCount.TEN_RIDE_NUM,
          passengerCount.TWELVE_RIDE_NUM,
          passengerCount.FOURTEEN_RIDE_NUM,
          passengerCount.SIXTEEN_RIDE_NUM,
          passengerCount.EIGHTEEN_RIDE_NUM,
          passengerCount.TWENTY_RIDE_NUM,
          passengerCount.TWENTY_TWO_RIDE_NUM,
          passengerCount.MIDNIGHT_RIDE_NUM,
        ],
        backgroundColor: "blue",
      },
      {
        label: ["하차 인원"],
        data: [
          passengerCount.FOUR_ALIGHT_NUM,
          passengerCount.SIX_ALIGHT_NUM,
          passengerCount.EIGHT_ALIGHT_NUM,
          passengerCount.TEN_ALIGHT_NUM,
          passengerCount.TWELVE_ALIGHT_NUM,
          passengerCount.FOURTEEN_ALIGHT_NUM,
          passengerCount.SIXTEEN_ALIGHT_NUM,
          passengerCount.EIGHTEEN_ALIGHT_NUM,
          passengerCount.TWENTY_ALIGHT_NUM,
          passengerCount.TWENTY_TWO_ALIGHT_NUM,
          passengerCount.MIDNIGHT_ALIGHT_NUM,
        ],
        backgroundColor: "red",
      },
    ],
  });
  const reversedOutcourseLast = [
    ...outcourseLast.SearchLastTrainTimeByIDService.row,
  ].reverse();
  const reversedIncourseLast = [
    ...incourseLast.SearchLastTrainTimeByIDService.row,
  ].reverse();

  const lineColor = () => {
    switch (passengerCount.LINE_NUM) {
      case "1호선":
        return "#0052A4";
      case "2호선":
        return "#009D3E";
      case "3호선":
        return "#EF7C1C";
      case "4호선":
        return "#00A5DE";
      case "5호선":
        return "#996CAC";
      case "6호선":
        return "#CD7C2F";
      case "7호선":
        return "#747F00";
      case "8호선":
        return "#EA545D";
      case "9호선":
      case "9호선2~3단계":
        return "#BDB092";
      case "분당선":
        return "#F5A200";
      case "경강선":
        return "#003DA5";
    }
    return;
  };

  return (
    <div className={classes.layout}>
      <div className={classes.container}>
        <div
          className={classes.stationTitle}
          style={{ backgroundColor: lineColor() }}
        >
          {incourseLast.SearchLastTrainTimeByIDService.row[0].STATION_NM}역
        </div>
        <div className={classes.timetableWrap}>
          <div className={classes.incourseWrap}>
            내선 순환(시계 방향)
            {reversedIncourseLast.map((incourse: any, idx: number) => {
              return (
                <div className={classes.timetable} key={idx}>
                  <span>{incourse.SUBWAYENAME}행</span>
                  <span>{incourse.LEFTTIME}</span>
                </div>
              );
            })}
          </div>
          <div className={classes.outcourseWrap}>
            외선 순환(반시계 방향)
            {reversedOutcourseLast.map((outcourse: any, idx: number) => {
              return (
                <div className={classes.timetable} key={idx}>
                  <span>{outcourse.SUBWAYENAME}행</span>
                  <span>{outcourse.LEFTTIME}</span>
                </div>
              );
            })}
          </div>
        </div>
        {passengerCount && (
          <div style={{ margin: "12px" }}>
            <BarChart chartData={passengerData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default StationDetail;

export async function getServerSideProps({ params: { params } }: any) {
  const SEOUL_API_KEY = process.env.NEXT_PUBLIC_SEOUL_API_KEY;
  const theDay = () => {
    const todayDay = dayjs(new Date()).day();
    if (todayDay === 0) return 3;
    else if (todayDay === 6) return 2;
    else return 1;
  };
  console.log(params);
  const { data: incourseLast } = await API_get(
    `http://openAPI.seoul.go.kr:8088/${SEOUL_API_KEY}/json/SearchLastTrainTimeByIDService/1/5/${
      params[1]
    }/${theDay()}/1/`
  );

  const { data: outcourseLast } = await API_get(
    `http://openAPI.seoul.go.kr:8088/${SEOUL_API_KEY}/json/SearchLastTrainTimeByIDService/1/5/${
      params[1]
    }/${theDay()}/2/`
  );

  const { data: stationPassengerData } = await API_get(
    encodeURI(
      `http://openapi.seoul.go.kr:8088/${SEOUL_API_KEY}/json/CardSubwayTime/1/1/202204/${params[1].substring(
        1,
        2
      )}호선/${params[0]}/`
    )
  );
  return {
    props: { incourseLast, outcourseLast, stationPassengerData, params },
  };
}
