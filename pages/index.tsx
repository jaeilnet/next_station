import type { NextPage } from "next";
import Map from "../components/map";
import UseFetch from "../components/useCustom/UseFetch";

const Home: NextPage = ({ data, test }: any) => {
  // console.log(test, "test");

  return <Map data={data.subwayStationMaster} />;
};

export default Home;

export async function getStaticProps() {
  const SEOUL_API_KEY = process.env.NEXT_PUBLIC_SEOUL_API_KEY;
  const REAL_TIME_KEY = process.env.NEXT_PUBLIC_REALTIME_API_KEY;

  const { data: coordinate } = await UseFetch(
    `http://openapi.seoul.go.kr:8088/${SEOUL_API_KEY}/json/subwayStationMaster/1/742/`
  );

  // const { data: patch } = await UseFetch(
  //   `http://swopenAPI.seoul.go.kr/api/subway/${REAL_TIME_KEY}/json/realtimeStationArrival/ALL`
  // );

  return {
    props: {
      data: coordinate,
      // test: patch,
    },
  };
}
