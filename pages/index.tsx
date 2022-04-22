import type { NextPage } from "next";
import Map from "../components/map";

const Home: NextPage = ({ data }: any) => {
  // console.log(data);

  return <Map data={data.subwayStationMaster} />;
};

export default Home;

export async function getStaticProps() {
  const SEOUL_API_KEY = process.env.NEXT_PUBLIC_SEOUL_API_KEY;

  const response = await fetch(
    `http://openapi.seoul.go.kr:8088/${SEOUL_API_KEY}/json/subwayStationMaster/1/742/`
  );

  const data = await response.json();

  return {
    props: {
      data: data,
    },
  };
}
