import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { API_get } from "../components/common/api";
import { StationInfoIdType } from "../components/constant";
import Map from "../components/map";
import StationInfo from "../components/map/StationInfo";
import classes from "../styles/Home.module.css";

const MAP: NextPage = ({ data }: any) => {
  const [stationInfo, setStationInfo] = useState<StationInfoIdType>({
    errorMessage: {
      code: "",
      developerMessage: "",
      link: "",
      message: "",
      total: 0,
      status: 0,
    },
    realtimeArrivalList: [],
    id: [],
  });

  const handleStationInfo = (data: any, id: string[]) => {
    setStationInfo({
      ...stationInfo,
      realtimeArrivalList: data.realtimeArrivalList,
      errorMessage: data.errorMessage,
      id,
    });
  };

  return (
    <>
      {/* <Head></Head> */}
      <div className={classes.layout}>
        <div className={classes.container}>
          <Map
            data={data.subwayStationMaster}
            handleStationInfo={handleStationInfo}
          />
          {stationInfo && stationInfo.errorMessage?.status === 200 ? (
            <StationInfo
              data={stationInfo.realtimeArrivalList}
              id={stationInfo.id}
            />
          ) : (
            <div>정보 가져오는 중...</div>
          )}
        </div>
      </div>
    </>
  );
};

export default MAP;

export async function getStaticProps() {
  const SEOUL_API_KEY = process.env.NEXT_PUBLIC_SEOUL_API_KEY;

  const { data: coordinate } = await API_get(
    `http://openapi.seoul.go.kr:8088/${SEOUL_API_KEY}/json/subwayStationMaster/1/742/`
  );

  return {
    props: {
      data: coordinate,
    },
    // revalidate: 2,
    // 2초마다 최신화
  };
}
