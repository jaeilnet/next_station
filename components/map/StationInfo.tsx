import dayjs from "dayjs";
import React, { useCallback, useState } from "react";
import { RealTimeArrivalListType } from "../constant";
import classes from "./StationInfo.module.css";

interface Props {
  data: RealTimeArrivalListType[];
}

interface DetailState {
  index: Number | null;
  show: boolean;
}

const StationInfo: React.FC<Props> = ({ data }) => {
  const [detail, setDetail] = useState<DetailState>({
    index: null,
    show: false,
  });

  const arriveScheduledTime = useCallback((date: string) => {
    return Math.floor(+date / 60) + "분 소요예정";
  }, []);

  const arriveDate = useCallback((date: string) => {
    return dayjs().add(Number(date), "second").format("HH:mm");
  }, []);

  const arriveUpdnLine = (type: string) => {
    switch (type) {
      case "1":
        return "외선";
      case "0":
        return "내선";
      default:
        return type;
    }
  };

  const showDetail = (i: number) => {
    setDetail({ index: i, show: true });
    if (i === detail.index && detail.show) {
      setDetail({ index: i, show: false });
    }
  };

  // console.log(detail, "detail");

  return (
    <div className={classes.container}>
      {data.length > 0 ? (
        data.map((e: RealTimeArrivalListType, i: number) => (
          <div className={classes.statinList} key={i}>
            <div>
              <p>{`${e.statnNm}역`}</p>
              <p className={classes.station}>{e.trainLineNm}</p>
              <p className={classes.station}>{`${e.btrainNo}호`}</p>
              <button onClick={() => showDetail(i)}>
                {detail.index === i && detail.show ? "닫기" : "자세히보기"}
              </button>
            </div>
            <div className={classes.stationBox}>
              {detail.show && detail.index === i && (
                <>
                  <div className={classes.position}>
                    <p>현재위치</p>
                    <p className={classes.desc}>{e.arvlMsg3}</p>
                    {e.barvlDt > "0" ? (
                      <>
                        <p>도착 예정시간</p>
                        <p className={classes.desc}>{arriveDate(e.barvlDt)}</p>
                        <p className={classes.desc}>
                          {arriveScheduledTime(e.barvlDt)}
                        </p>
                      </>
                    ) : (
                      <>
                        <p>열차상태</p>
                        <p className={classes.desc}>{e.arvlMsg2}</p>
                      </>
                    )}
                  </div>
                  <div>
                    <p>최종 목적지</p>
                    <p className={classes.desc}>{e.bstatnNm}</p>
                  </div>
                  <div>
                    <p>내리는 방향</p>
                    <p className={classes.desc}>{e.subwayHeading}</p>
                  </div>
                  <div>
                    <p> 상하행선구분</p>
                    <p className={classes.desc}>{arriveUpdnLine(e.updnLine)}</p>
                  </div>
                  {e.btrainSttus !== null && (
                    <div>
                      <p> 열차종류 (급행,ITX)</p>
                      <p className={classes.desc}>{e.btrainSttus}</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className={classes.warring}>현재 운행 중인 열차가 없습니다</div>
      )}
    </div>
  );
};

export default StationInfo;
