import type { NextPage } from "next";
import { useState } from "react";
import { StationInfoType } from "../components/constant";
import Map from "../components/map";
import StationInfo from "../components/map/StationInfo";
import UseFetch from "../components/useCustom/UseFetch";
import classes from "../styles/Home.module.css";

const MAP: NextPage = ({ data }: any) => {
  const [stationInfo, setStationInfo] = useState<StationInfoType>({
    errorMessage: {
      code: "",
      developerMessage: "",
      link: "",
      message: "",
      total: 0,
      status: 0,
    },
    realtimeArrivalList: [],
  });

  const handleStationInfo = (data: any) => {
    setStationInfo(data);
  };

  return (
    <div className={classes.layout}>
      <div className={classes.container}>
        <Map
          data={data.subwayStationMaster}
          handleStationInfo={handleStationInfo}
        />
        {stationInfo && stationInfo.errorMessage?.status === 200 ? (
          <StationInfo data={stationInfo.realtimeArrivalList} />
        ) : (
          <div>정보 가져오는 중...</div>
        )}
      </div>
    </div>
  );
};

export default MAP;

export async function getStaticProps() {
  const SEOUL_API_KEY = process.env.NEXT_PUBLIC_SEOUL_API_KEY;

  const { data: coordinate } = await UseFetch(
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
