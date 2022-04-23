import React, { useEffect } from "react";
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
          level: 4,
        };
        const map = new window.kakao.maps.Map(container, options);

        const coordinate = row.map((e: any) => {
          return {
            title: e.ROUTE + e.STATN_NM,
            latlng: new window.kakao.maps.LatLng(e.CRDNT_Y, e.CRDNT_X),
          };
        });

        // const currentPosition = map.getCenter();

        function markerImgSet(route: string) {
          switch (route) {
            case "1호선":
            case "경부선":
            case "경인선":
            case "장항선":
              return "https://w.namu.la/s/5476459c3b4b292a217c690aa91aabf19036400661860a24a1f90fd9c378a9ba42dbf9cc77096743075bfc0e189f951bce15e293252f2f2063ab13d6e94447640906830ff67c462501b46e83cc712b0e";
            case "2호선":
              return "https://w.namu.la/s/d7de06a7e230e8f07fcbe55ab33f40dcbfdf4fd0fd6d4009038dff373e382c0353347208b05b22f84e9e26e65e7ee316e52b38274538881688b493b11c582f0bf944dda7712d2fcc56f1c46a2b19a971";
            case "3호선":
              return "https://w.namu.la/s/3db13b3fdd97ce006e49fa8be1ee4ca464806aa4d559b44e72a4fdd43d7cddc7f23cb592ca44e4c38209e9964ec0d5df6186fb3705ff348f0105c467ca70a52991fc8e99e0722cbacea3f71d2baa367b";
            case "안산선":
            case "과천선":
            case "4호선":
              return "https://w.namu.la/s/f426f6a5b2b0cdb4a35cecde572fe71c34dcfea8e936700482879f9f58d6a95d28c36d2e20500365661349e8ddeafa6d12fbfd2b086cdda7b01b5edf748cb32f438068091163b2ff807269285ddbbe92f863329762e3b9621c110513482789d3";
            case "5호선":
              return "https://w.namu.la/s/7331b5aa054c3a47ca37683a52731462d355e18c26491e34b6071ea6c8dc43ee3cc9c6cf2b8b70afaeda9fa2e4ff07a0baf003625a561c55b2047c7fa1e2b13d06262073dffaee1b7aa337e3bd2bb459";
            case "6호선":
              return "https://w.namu.la/s/3089376793c3a9d7b34710802b7f12d7d324c3cf4b9017eab719849331d2ed945cda0514fdab558b66c4949f3cdf6d7440621d53c1c9d2d5fd649939b7de7d24f68e320d994f58346197581c9f0bf390";
            case "7호선":
              return "https://w.namu.la/s/878e57397d222871b09162b6cfdbfc71f0bc8dae436ea7e0952c2b9aeba6728ea0601282a0e06aa395527b4d99134e7ccf82621cffc2672198f1ff70f760086070285704ff83014e056d204274cc40a5";
            case "8호선":
              return "https://w.namu.la/s/a4589350dd67b1504849efb0103ebfddc063a193943d042195943b80d9855014268f99d66537c7685404588287d2567c7c276e9ffec5758c20550ad9e759f91eb2d10606cc40c64914a685feffe67257";
            case "9호선":
            case "9호선(연장)":
              return "https://w.namu.la/s/e74e83e5d0edb66c5a38f6d4314b3c85e396f9341eae8253eec09a85724bfca22e79c01f52f7f596b64f7ecefdc93ee8aa00f22e2579320d0362c80286c9d95edd49ac6101ced3bbbc8123b1e4596f72";
            case "인천1호선":
              return "https://w.namu.la/s/a81e6d609eb56e2e9045d313249240cb90bf9db81fb7414d43bae651371fc45b48832953af6acec116efc7f5fc4742287435a57c774c1d711c0c6558bd6734731245872fbe521fb06094b827308c3fc0419f64061d68c86caa805acc6a8be677";
            case "인천2호선":
              return "https://w.namu.la/s/ce76ea0099f421de113dd61ba371732b5e3924799924a5371c8b95efc075b3905091f2d29c37f2d05e0581d3d9aac73ef6831c13592b17e178951e99fc3bdee2eda36b1bb4604da522594a99013d71ee751b2d8a505622f1afd6351ed935a3ea";
            case "공항철도1호선":
              return "https://w.namu.la/s/6465e2acaa402a5ef3a2ce1a5912ce0fcb262afbe1a24871810c1a56424180e1847184b8655cc4364984efbe8e5d38cc94e1c6b5bb620739da1841baeab0f46fdeae9c75088cafc26a051592ca013c40da16a407b7c3ee056d5ea865adf3890a";
            case "신분당선":
            case "신분당선(연장)":
              return "https://w.namu.la/s/7d11ea86c519c660b0f1dfa515bba9e0148fe030b040397c252f3bbd712543feb7a1664767da2c4d17e081d9efbb412da729303f7f94fe1d7dbedb3ffecafbd378f5694b35bc6190649cecf05f6249d619244cde9b137b75aed43118c0d66d40";
            case "서해선":
              return "https://w.namu.la/s/100007b8d928fd1b15dbc5c5d3f07a542fbeda0664d482d9620e01c40fd9d9e348259fc9675692cfc058cb39d4f9e93e8cf9d4b53475a2543fc8800508859fb38654af60cff0ec51c0fb98be158deef1438d60429a416cde791f1c3517bb4cca";
            case "김포골드라인":
              return "https://w.namu.la/s/62da8c1daff2270e90c7f4ec95f574db153e7b728c0702bee047dc778721bdf27fb536a593389cf7678b97a4fb903d11704343bb23c10fc71cbda42fefbeb297477767a8e59d1981ac87f45a2d5f93f1d0961466b787d7db70e6f4454cf0a83b";
            case "의정부선":
              return "https://w.namu.la/s/9401fa6e4522cbe3aad84d3044e47a0be4ad4713799c43448a9e3a9b5e5e02adb1d3824ae3930a5634ab0182f3e1aebf9bd64713ecb9af808cdbb441883ad2227bd9fb880c99d536f69aa96d51fbff2fd15625b754966379ef01798dd4b7cfe3";
            case "우이신설선":
              return "https://w.namu.la/s/24dc1c4bbefcbb40114ec00a8dce18dd471e79d3a86236c30bae9eba7c435d5ab924ba21c3f9c285b1e0a495b7fce71164533a59b2804aecf2193b680d8dfa8fc6dc64e7b1bfc5fad52d7f21a5c00777d0c724bcfbe53af5c100109b2b8df58a";
            case "에버라인선":
              return "https://w.namu.la/s/057d3a4de0808752ebc4989dc490bdcd7f548b4ba7fb20e2ebe3987c508c0a18c34906dac255d1f2f29be1ad2b4eb12720fda4da175b4019788bd030175ffa30edc6f719098ebf87b072c32730393e3bfbbf9a1ad133cf44c59aa6765b623c84";
            case "일산선":
              return "https://w.namu.la/s/3db13b3fdd97ce006e49fa8be1ee4ca464806aa4d559b44e72a4fdd43d7cddc7f23cb592ca44e4c38209e9964ec0d5df6186fb3705ff348f0105c467ca70a5290ddb7fd9d2b8ca1b5ac6d61a8abeb182de4d3bf0151b2bb60eea72f5fa4f4fa7";
            case "경의선":
            case "경원선":
            case "중앙선":
              return "https://w.namu.la/s/d6fbaca487c63ac77b810f74c3d7005f2ad70d3932050d8417e678d5544a594ee4e2c96f6db8af176de82754b2e6d07726e304dc85f3a0651d463e0e4cfdd67ec87e8f202f988fadc425be6f5335bf92e5e5f82dba05fb415fd11a2db332fae9";
            case "수인선":
            case "분당선":
              return "https://w.namu.la/s/05fd09451186af4968ddb8689bd48bdc3fed38f05b658edb9da83eff292ef7a2164fb0032162d31845ed268a0dcc38c13039476ee6bf20574b3dc6c2311d224f1ba19a7c54ec96486f57fa0cbf564f64e2acb6bf5a622cf4533fc470f6a4d988";
            case "경춘선":
              return "https://w.namu.la/s/7a72ab105b8b80c435f010d7c622881bd78ab83a1163800f60528e8e5618490ca746dd244438e92d3a5512bbfcec5b90775151e455f17d8cc7fdb1bc1351d44688ea05210f279a5a491194ff8d8adb6628496f8c0cd5e3f30712fe9c2ca3d83a";
            case "경의중앙선":
              return "https://w.namu.la/s/d6fbaca487c63ac77b810f74c3d7005f2ad70d3932050d8417e678d5544a594ee4e2c96f6db8af176de82754b2e6d07726e304dc85f3a0651d463e0e4cfdd67ec87e8f202f988fadc425be6f5335bf92e5e5f82dba05fb415fd11a2db332fae9";
            default:
              return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAe1BMVEX///8AAADs7OwQEBCbm5vCwsL09PTV1dXv7+8ICAjg4ODy8vL8/Pz4+Pjd3d12dnaMjIyTk5Orq6s8PDyxsbEYGBiDg4N9fX0kJCTMzMwvLy+4uLiHh4dGRkagoKAbGxtqampgYGBSUlIrKytlZWVxcXFVVVU2NjZKSkpIxnoPAAALA0lEQVR4nO1d60LyOBClIAjY4gVRwAvg/f2fcEXUTpKTNm3PJOyu56dfvkxPSTPXTHq9zsivd4uJBhYPl/3uj9cdw0WmiJs8Nb/epSa/T6yniQmeKxP8xCopwZ0+wSw7/a8TTEnxNg7BbJLqW9TeZEosiyQE76IRzLKnFAT7EQlm2WUChnPnKW6vhxxcn6ydyePrjBv7ER6p38rswZp+M2JOH4CV9QBPdAvy0ZLwyhZQg6Up/kZBhP0Shwoy/Lg3hZ+oCJlZFGMa4VNTtNZGN52oLxQfdobkWzU51q8Yz3ozv5BdNEnx9L6xk89VRV0l2WxMc01ZTxl6911X1i8WMV9rPo8p7QBDFevtMj8w9u21urhPjIxlE0FHGZ/itb683okUGGX/fpM/ov4rLaS9dqEubg/DT7tSF3ctpA0i2VFy2SzVpb0LaXfq0r4h91Pt7VQaGR/KskoMI0qV5kzEIJ/8EXUDb6dC0lZVkgm5dM5VJW2jvUsL8kccK8qR+7amS+FC/oiPinKkwTZTlAPwVErWNKTEPhP3JzR/RL3I4iyKFA/El6i311yUQnT9XgRpgKsJETL0zUMb0qfRMqakZXFWOTIfC1TvC/nZL8bVk4p0s9Ym8FKK2FaPPM0Gv5h8VFEsHjbL5eaAxaJyUrkL6IRO5DKp2Wek6ZNlLxUjn4yR1bOKvUZnmYpFWufCmAwrQrlWoUP1rMJx04krvpYC6oLcFkOvFWJnX6pnHYuRGqVExXM5f509YzP0OHVDe1jNtLtypMYyFU89rzObHIbwnUydUTXTCpWokWsT6r42POMyHLjL6mzQlKF4JQsF21TYpLWur8vQNZfzD3cQ8xkaQzhOz7WDAUNHS2/BmLp5xc7ET1k2+gYQQ0tnXKAhdfOKZcpPYezKyev3McjQ0BnXcETtxCJlSjdrxHPURxEwQ6Ez7Bx9KENhIbD1hVgfATFZD8NfndF3t9EwhuKnZzuJYuqArL2P4bcpIo2HZgzFfsdOQ4mdLyDo7GU4/yorevL9c/3MG/tt0SDeerUX9wUvw+ytV1W0WT+zMI65cZRmn2EFw8/Pxza3GzEUSotb4yJs5BCLsIJhhjR9OEPxqt86s5IQCyvEmKhiWIX6mfulRuTW8om9IcQg1GMoTVNmWmEsyi9CtjCT4etb5oNVwxkwtQgWMeN90h4MKSM1Gd7mViXjL+4s2yZgalFczqxzEzVCQd+3yfAc+LpfuLC9/ICpxf9gBmuEIxBkLNkM3XjFHlvn7wFTz5oND8WunDVo8TsMrfq0L+zT1c0ZFsKkJVo1YtYgS8Jl6NaFr/ebfXOG0rriFS3IWHBQ9AAwdIzRr72+BUOhLnipUvkcQSsDMczfjT+eOjMHMhQ2UVUwvRnERxQW40IMe31Z0/jtv7ZgKNRFdZ6jCUTdelhJEmQo//pj+rVgKOMftJCi+ITCMqOYYalWf//SgqH8L7RaAhH/CVv6HoY/K6y0GlowlHPTNlMxZ1jFrI/hwYEVFZQtGMqKF1a1qTQjwuotvQz3gW4Z4G/BsBDj7xvx8EM+RpgK8jLsjQaGRm3BUK4oVrZb7l5h68LPsDc14pwdGbIqQqTB1ZmhiY4MlyQ3fyfmDIs0qzKUh6FIbr6sKT0ChjKcTMqxySOrR8BQvnBOzHQM7MkaRGPICdUYIYgjY8g5DmE87hEwnIdN3QBGPOwItIVkuA36H3Voce4oGkPO0QTjVHMbhhWZjjYMZazgmdIEwEiGhTJcfNcbLpfLRYU/ssoWXzgMbs4wJNVXj/PmDPP+d23pV91oxXv+HXhA0ORGRwnKyYTX5gxV8UxnuD1mhpSg8MuRMTTSPBTD1MiNaZ5XCYTBkGKYGsFqnQ4YjbCRz8OoG8qN/gJxzsVWQj4OxfQ2D8TH7L7hgcGQ8dWYDLeEGbvBzLYyvhqTof5B4zqYmUhGUY2VM0rdqNHqwKXAkBWEbQuF5j8Ww4nmGdUAvPIZFibD6EcrTdiltwztVdjd4VKaNWO74a0KwwRnD38wckpvdRgmU/unbstiJYbZOm53uAPGqPJWi2GWPVysZv2ImN29osfgMPSVnWeTQTT4HkGZ4TGAYYD8MUyLP4ZBDH0FvkcBhmr+Y5gWfwz//QwZfRv/GKYFheGmXk46MBiO/vsMVW/K6QpGMcb/gKHfOTsC/DEMYjipl5MOfwxDcJaaRCUYnXj+GKaFNsP51WrUK6Z3/qPMXbA+WfV7+Wy4qxijy/CtLGbp82+Yeyjj6n3neGYchmaCxtNxpjXMUO/MZxwzGI49c9upiz7Vy7Jrr8Ywt8CpnPAwdMu/fG112sDNUbqJNWWGSNPCI+mtgPLM+DPQYwiz+S9waAvAuljY1kaNIU75tG34YQObYrAxgxpDz/FU+7K0lvDMDpr0qTHceMbeg7Et4DnAjG6U1GLoqzipaJDUAL4jBqDzBOVIPmLoy/hwdlNf+xQ0e2yGnIs7fSskJsOtZyzuhtgUvrOv6P1pMfT19+TcLjvwzI6+ci2GvqMqutoC+WiMKjvIENe2sa6XxQWHBRqq5j3hriK4qKcFoEKEylYvqo/MNpbRhvdq3E2LUjGE/T73KIfPhWsD9xhF4d4/vAe/Vr+EvR0UpG3mAOcF7vA4Sgmhr5Wj+RDTd8+wljB/xbHnNXMK6088k2fn5cGxgmORSuzK2XOvJcG5dL0ixnS+6o8+lcTsXiUD97Lakzybnfirsji9sPqViYvlfK6YnHqfzysDXKSC7J0eg64gnW/hRZjYYPWGzFMT8YLWtZzjMvAxYRHs5UeaJCUeSkYRkvSg3hvm7aKeEtSW5b70TEqQjySzk2fdwW1Y3mOFQnlYUyxSA5w4GgtrjZvXOMFQDt74v+AeM7IL2B5qfQ9yf8VATKw1bwg9pYYq2uFS+b7zVVqOkwudL9DA6W2y2vana0pfqHoUw3tfZEgR26u4/RyK4dX903KQabsdk2yy+Xg9udO40jEMbij6YTrzYVoD4MNoXHTYCLkb6O7SZBsUI6TuTOVqyE6dKmYuQ5UrR8PhBqk6uqUgwaRzb2wgQEqvYyN4dAYpXZcKlNLofC4XuTDpuv643gbhQjtgM3F6eLYASGoP81FHFCjPmqpLnFs5MCGkMKAJQbvmoRFihhjZ1zkGgVV4EYYUvf4i2978G47rEDuX4dwJrQ1eZUkoYjeKA04wM0SLaro1ozNhT8C0kHMQ1tO4Tt0LlBXmWo/IyWDfcVwBdICdnUZANS7xOoyhGiJ6lB0k9AYaoXwEFN5n3wOOi1x4V8lVApVjbhXkxHmRCGD5LFSWDzrTGKO3KEokKm0BwFOJ0FsUFbJulWShxLN+6A244BO1LQ4VPmuH3i6ATEU1BRyYBz1peyCDWzMqjUwb1R64IMKtoOslkGmjGXpDBreyKQV0k+I6RQb35vGkxCXGRS3uD7g54PaA80/c7oBMtdDbCAhLA63Q2y41sV8ohd6OqUBRJaThueM+ETRCGsdVgLnmhzS850oSgXFozQAyLtKCvE6hMZMWG27pEKmVABXU0Bty1M6lMaMOlEQg2osFcLbpRcg1QNqYZ/OjrizRa0DAQ9BCGijoFb+OB1nFpNAbSoVGClwaQJsBZyWBg/6DCEWeLkCFMmWdRowe1gAlpAj5IGRwp7pnRqfqDRgz1BNVjQDWU+eQBjJmEl69BhycjiENtH+lLKRDJ8w6hTRycE48haIoAYJhndYpqK5cxspSegACml1UF2AYtyLChevHdVLOxcC60+kI7pJ11FcNw38AcguxP2ApWcsAAAAASUVORK5CYII=";
          }
        }

        for (var i = 0; i < row.length; i++) {
          // console.log(coordinate[i]);
          var imageSrc = markerImgSet(row[i].ROUTE);
          var imageSize = new window.kakao.maps.Size(18, 18);

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

          // var infowindow = new kakao.maps.InfoWindow({
          //   content: positions[i].content, // 인포윈도우에 표시할 내용
          // });
        }

        marker.setMap(map);
      });
    };
    mapScript.addEventListener("load", onLoadKakaoMap);

    return () => mapScript.removeEventListener("load", onLoadKakaoMap);
  }, [row]);

  return <div style={{ width: "100%", height: "800px" }} id="map" />;
};

export default Map;
