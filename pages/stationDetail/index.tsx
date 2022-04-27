import React from "react";
import classes from "./StationDetail.module.css";
import { API_get } from "../../components/common/api";
import dayjs from "dayjs";

const stationDetail = ({ incourseLast, outcourseLast }: any) => {
  console.log(incourseLast.SearchLastTrainTimeByIDService.row);
  console.log(outcourseLast.SearchLastTrainTimeByIDService.row);

  const reversedOutcourseLast = [
    ...outcourseLast.SearchLastTrainTimeByIDService.row,
  ].reverse();
  const reversedIncourseLast = [
    ...incourseLast.SearchLastTrainTimeByIDService.row,
  ].reverse();

  return (
    <>
      <div className={classes.stationTitle}>
        {incourseLast.SearchLastTrainTimeByIDService.row[0].STATION_NM}역
      </div>
      <div className={classes.timetableWrap}>
        <div className={classes.incourseWrap}>
          내선순환(시계방향)
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
          외선순환(반시계방향)
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
    </>
  );
};

export default stationDetail;

export async function getStaticProps() {
  const SEOUL_API_KEY = process.env.NEXT_PUBLIC_SEOUL_API_KEY;
  const theDay = () => {
    const todayDay = dayjs(new Date()).day();
    if (todayDay === 0) return 3;
    else if (todayDay === 6) return 2;
    else return 1;
  };
  // const totalCount = () => {
  //   const totalCountData = API_get(
  //     `http://openAPI.seoul.go.kr:8088/${SEOUL_API_KEY}/json/SearchSTNTimeTableByIDService/1/1/0220/${theDay()}/1/`
  //   );
  // };

  const { data: incourseLast } = await API_get(
    `http://openAPI.seoul.go.kr:8088/${SEOUL_API_KEY}/json/SearchLastTrainTimeByIDService/1/5/0220/${theDay()}/1/`
  );

  // const totalCount = first.SearchSTNTimeTableByIDService.list_total_count;
  const { data: outcourseLast } = await API_get(
    `http://openAPI.seoul.go.kr:8088/${SEOUL_API_KEY}/json/SearchLastTrainTimeByIDService/1/5/0220/${theDay()}/2/`
  );
  // const { data: airPolutionInfo } = await UseFetch(
  //   `http://openapi.seoul.go.kr:8088/${SEOUL_API_KEY}/json/airPolutionInfo/1/5/`
  // );

  return {
    props: { incourseLast, outcourseLast },
  };
}
