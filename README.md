<!-- idle
중심 좌표나 확대 수준이 변경되면 발생한다.
단, 애니메이션 도중에는 발생하지 않는다.

kakao.maps.event.addListener(map, 'idle', function() {
    // do something
}); -->

<!-- https://apis.map.kakao.com/web/sample/setBounds/ -->

         if (isFetching) {
                return;
              }

              const timeLineFetch = async (stationNum: string) => {
                isFetching = true;
                const { data: timeLine } = await UseFetch(
                  `http://openapi.seoul.go.kr:8088/${TimeLine}/json/SearchSTNTimeTableByIDService/1/300/${stationNum}/1/1/`
                );

                const dats = dayjs().format("HH:mm:ss");
                const currentTime = timeLine.SearchSTNTimeTableByIDService.row
                  .filter((e: any) => e.ARRIVETIME > dats)
                  .slice(0, 5);

                const stationInfo = document.createElement("div");
                stationInfo.className = "container";
                stationInfo.id = "container";

                console.log(currentTime, "currentTime");
                let arriveBox = document.createElement("div");

                currentTime.map((e: any) => {
                  arriveBox.className = "arrive-box";
                  arriveBox.id = "arrive-box";
                  let arriveText = document.createElement("span");
                  arriveText.appendChild(document.createTextNode("도착예정"));
                  let arriteTime = document.createElement("span");
                  arriteTime.appendChild(document.createTextNode(e.ARRIVETIME));
                  arriveBox.appendChild(arriveText);
                  arriveBox.appendChild(arriteTime);
                });
                stationInfo.appendChild(arriveBox);
                customOverlay.cc.appendChild(stationInfo);
              };

              timeLineFetch(customOverlay.cc.id);
