import type { NextPage } from "next";
import Map from "../components/map";
import StationInfo from "../components/map/StationInfo";
import UseFetch from "../components/useCustom/UseFetch";
import classes from "../styles/Home.module.css";

const MAP: NextPage = ({ data, test }: any) => {
  // console.log(patch, "patch");
  return (
    <div className={classes.layout}>
      <div className={classes.container}>
        <Map data={data.subwayStationMaster} />
        {/* <StationInfo data={test} /> */}
      </div>
    </div>
  );
};

export default MAP;

export async function getStaticProps() {
  const SEOUL_API_KEY = process.env.NEXT_PUBLIC_SEOUL_API_KEY;
  const REAL_TIME_KEY = process.env.NEXT_PUBLIC_REAL_TIME_API_KEY;

  const { data: coordinate } = await UseFetch(
    `http://openapi.seoul.go.kr:8088/${SEOUL_API_KEY}/json/subwayStationMaster/1/742/`
  );

  // const { data: patch } = await UseFetch(
  //   `http://swopenAPI.seoul.go.kr/api/subway/${REAL_TIME_KEY}/json/realtimeStationArrival/ALL`
  // );

  // console.log(patch, "ss");
  // const filter = patch.realtimeArrivalList.filter(
  //   (e: any) => e.btrainNo === "11"
  // );

  // const search = patch.realtimeArrivalList.filter(
  //   (e: any) => e.btrainNo === "5078"
  // );

  return {
    props: {
      data: coordinate,
    },
    revalidate: 2,
  };
}
