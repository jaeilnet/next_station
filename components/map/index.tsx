import dayjs from "dayjs";
import { title } from "process";
import React, { useEffect } from "react";
import UseFetch from "../useCustom/UseFetch";
import markerStation from "./marker";
interface MapProps {
  data?: any;
}

interface coordinate {
  title: string;
  latlng: any;
}

type Props = MapProps;

const Map: React.FC<Props> = ({ data: { row } }) => {
  // console.log(row);
  const APIKEY = process.env.NEXT_PUBLIC_KAKAOMAP_APPKEY;
  const TimeLine = process.env.NEXT_PUBLIC_SEOUL_API_KEY;

  useEffect(() => {
    const mapScript = document.createElement("script");

    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${APIKEY}&autoload=false`;

    document.head.appendChild(mapScript);

    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(37.556228, 126.972135),
          level: 6,
        };
        const map = new window.kakao.maps.Map(container, options);

        const coordinate = row.map((e: any) => {
          return {
            title: e.ROUTE + " " + e.STATN_NM,
            latlng: new window.kakao.maps.LatLng(e.CRDNT_Y, e.CRDNT_X),
          };
        });

        for (let i = 0; i < row.length; i++) {
          const imageSrc = markerStation(row[i].ROUTE);
          const imageSize = new window.kakao.maps.Size(18, 18);

          let markerImage = new window.kakao.maps.MarkerImage(
            imageSrc,
            imageSize
          );

          let marker = new window.kakao.maps.Marker({
            map: map,
            position: coordinate[i].latlng,
            image: markerImage,
            title: coordinate[i].title,
          });

          marker.setMap(map);
          // map.setCenter(locPosition);
        }
      });
    };
    mapScript.addEventListener("load", onLoadKakaoMap);

    return () => mapScript.removeEventListener("load", onLoadKakaoMap);
  }, [row]);

  return <div style={{ width: "100%", height: "800px" }} id="map"></div>;
};

export default Map;

// ARRIVETIME: "06:12:00";
// BRANCH_LINE: "";
// DESTSTATION: "1019"; 도착지하철역코드
// DESTSTATION2: "";
// EXPRESS_YN: "G";
// FL_FLAG: "";
// FR_CODE: "133";
// INOUT_TAG: "1"; 상/하행선
// LEFTTIME: "06:12:30"; 출발시간
// LINE_NUM: "01호선";
// ORIGINSTATION: "1716"; 출발지하철역코드
// STATION_CD: "0150";
// STATION_NM: "서울역";
// SUBWAYENAME: "광운대"; 도착지하철역명
// SUBWAYSNAME: "병점"; 출발지하철역명
// TRAIN_NO: "K402";
// WEEK_TAG: "1"; 요일 평일 1/ 주말 2 휴일/일 3

//  공통	list_total_count	총 데이터 건수 (정상조회 시 출력됨)
// 공통	RESULT.CODE	요청결과 코드 (하단 메세지설명 참고)
// 공통	RESULT.MESSAGE	요청결과 메시지 (하단 메세지설명 참고)
// 1	LINE_NUM	호선
// 2	FR_CODE	외부코드
// (외부코드는 지하철에 역 이름과 함께 적혀있는 역번호로, 외국인의 경우 역명보다 역번호로 문의를 하는 경우가 많음)
// 3	STATION_CD	전철역코드
// 4	STATION_NM	전철역명
// 5	TRAIN_NO	열차번호
// 6	ARRIVETIME	도착시간
// 7	LEFTTIME	출발시간
// 8	ORIGINSTATION	출발지하철역코드
// 9	DESTSTATION	도착지하철역코드
// 10	SUBWAYSNAME	출발지하철역명
// 11	SUBWAYENAME	도착지하철역명
// 12	WEEK_TAG	요일
// 13	INOUT_TAG	상/하행선
// 14	FL_FLAG	플러그
// 15	DESTSTATION2	도착역 코드2
// 16	EXPRESS_YN	급행선
// (G:일반(general) D: 급행(direct))
// 17	BRANCH_LINE	지선
