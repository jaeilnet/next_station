import React from "react";
import classes from "./station.module.css";
import UseFetch from "../../components/useCustom/UseFetch";

const stationDetail = ({ first, last }: any) => {
  console.log(first.SearchSTNTimeTableByIDService.list_total_count);
  console.log(last);
  return <div>Detail page</div>;
};

export default stationDetail;

export async function getStaticProps() {
  const SEOUL_API_KEY = process.env.NEXT_PUBLIC_SEOUL_API_KEY;

  const { data: incourseLast } = await UseFetch(
    `http://openAPI.seoul.go.kr:8088/${SEOUL_API_KEY}/json/SearchSTNTimeTableByIDService/1/5/0220/1/1/`
  );

  const totalCount = first.SearchSTNTimeTableByIDService.list_total_count;
  const { data: outcourseLast } = await UseFetch(
    `http://openAPI.seoul.go.kr:8088/${SEOUL_API_KEY}/json/SearchSTNTimeTableByIDService/1/5/0220/1/1/`
  );
  // const { data: airPolutionInfo } = await UseFetch(
  //   `http://openapi.seoul.go.kr:8088/${SEOUL_API_KEY}/json/airPolutionInfo/1/5/`
  // );

  return {
    props: { first, last },
  };
}
