import dayjs from "dayjs";
import React, { useEffect } from "react";
import { API_post } from "../common/api";
import { RealTimeArrivalListType } from "../constant";
import markerStation from "./marker";

interface MapProps {
  data: {
    row: row[];
  };
  handleStationInfo: (data: RealTimeArrivalListType, id: string[]) => void;
}

interface coordinate {
  title: string;
  latlng: {
    La: number;
    Ma: number;
  };
}

export interface row {
  CRDNT_X: string;
  CRDNT_Y: string;
  ROUTE: string;
  STATN_ID: string;
  STATN_NM: string;
}

type Props = MapProps;

const Map: React.FC<Props> = ({ data: { row }, handleStationInfo }) => {
  const APIKEY = process.env.NEXT_PUBLIC_KAKAOMAP_APPKEY;

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

        const coordinate = row.map((e: row): coordinate => {
          return {
            title: e.ROUTE + " " + e.STATN_NM,
            latlng: new window.kakao.maps.LatLng(e.CRDNT_Y, e.CRDNT_X),
          };
        });

        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(function (po) {
            const latitude = po.coords.latitude;
            const longitude = po.coords.longitude;

            let position = new window.kakao.maps.LatLng(latitude, longitude);

            showMarker(position);
          });
        } else {
          let position = new window.kakao.maps.LatLng(37.556228, 126.972135);

          showMarker(position);
          alert("위치정보를 받아 올 수 없습니다.");
        }

        function showMarker(position: { La: number; Ma: number }) {
          const { La, Ma } = position;
          const filter = coordinate.filter(
            (e: coordinate) =>
              La - e.latlng.La < 0.014 &&
              La - e.latlng.La > -0.014 &&
              Ma - e.latlng.Ma < 0.006 &&
              Ma - e.latlng.Ma > -0.006
          );

          // 경도(가로길이만 비교함 위도 해야함)
          const sort = filter.sort(
            (a: any, b: any): number =>
              Math.abs(La - a.latlng.La) - Math.abs(La - b.latlng.La)
          );

          const findStation = sort.map(
            (e: coordinate) => e.title.split(" ")[1]
          );

          filter.push({
            title: "me",
            latlng: position,
          });

          const id = row.filter((e) => findStation[0] === e.STATN_NM);

          handleFindSubway(findStation[0], id);

          for (let i = 0; i < filter.length; i++) {
            const imageSrc = markerStation(filter[i].title.split(" ")[0]);
            const imageSize = new window.kakao.maps.Size(18, 18);

            let markerImage = new window.kakao.maps.MarkerImage(
              imageSrc,
              imageSize
            );

            let marker = new window.kakao.maps.Marker({
              map: map,
              position: filter[i].latlng,
              image: markerImage,
              title: filter[i].title,
            });

            let customOverlay = new window.kakao.maps.CustomOverlay({
              content: `<div class="infoMessage">${"현재위치"}</div>`,
              position: filter[filter.length - 1].latlng,
              removable: true,
              xAnchor: 0.5,
              yAnchor: 0.1,
              zIndex: 99,
            });

            customOverlay.setMap(map);
            map.setCenter(position);
          }
        }
      });

      async function handleFindSubway(stationName: string, id: any) {
        try {
          const {
            data: { stationInfo },
          } = await API_post(`/api/station`, { stationName });

          if (stationInfo.realtimeArrivalList.length > 0) {
            handleStationInfo(stationInfo, id);
          }
        } catch (error) {
          console.log("역 가져오기 에러발생", error);
        }
      }
    };
    mapScript.addEventListener("load", onLoadKakaoMap);

    return () => mapScript.removeEventListener("load", onLoadKakaoMap);
  }, [row]);

  return <div style={{ width: "100%", height: "400px" }} id="map"></div>;
};

export default Map;
