import type { NextPage } from "next";
import Map from "../components/map";

const Home: NextPage = ({ data }: any) => {
  // console.log(data);

  return (
    <div>
      <Map data={data.subwayStationMaster} latitude={33.45} longitude={126} />
    </div>
  );
};

export default Home;

export async function getStaticProps() {
  const SEOUL_API_KEY = process.env.NEXT_PUBLIC_SEOUL_API_KEY;

  const response = await fetch(
    `http://openapi.seoul.go.kr:8088/${SEOUL_API_KEY}/json/subwayStationMaster/1/30/`
  );

  const data = await response.json();

  console.log(data, "data");

  return {
    props: {
      data: data,
    },
  };
}
