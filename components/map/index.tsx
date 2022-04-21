import React, { useEffect } from "react";

interface MapProps {
  latitude: number;
  longitude: number;
  data?: any;
}

interface coordinate {
  title: string;
  latlng: any;
}

type Props = MapProps;

const Map: React.FC<Props> = ({ latitude, longitude, data: { row } }) => {
  //   console.log(data.row.map((e) => console.log(e)));

  console.log(row);
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
          level: 8,
        };
        const map = new window.kakao.maps.Map(container, options);

        const coordinate = row.map((e: any) => {
          return {
            title: e.ROUTE + e.STATN_NM,
            latlng: new window.kakao.maps.LatLng(e.CRDNT_Y, e.CRDNT_X),
          };
        });

        var imageSrc =
          "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

        for (var i = 0; i < row.length; i++) {
          var imageSize = new window.kakao.maps.Size(24, 35);

          // 마커 이미지를 생성합니다
          var markerImage = new window.kakao.maps.MarkerImage(
            imageSrc,
            imageSize
          );

          // 마커를 생성합니다
          var marker = new window.kakao.maps.Marker({
            map: map, // 마커를 표시할 지도
            position: coordinate[i].latlng,
            title: coordinate[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
            image: markerImage, // 마커 이미지
          });
        }

        marker.setMap(map);
      });
    };
    mapScript.addEventListener("load", onLoadKakaoMap);

    return () => mapScript.removeEventListener("load", onLoadKakaoMap);
  }, [latitude, longitude]);

  return <div style={{ width: "500px", height: "500px" }} id="map" />;
};

export default Map;
