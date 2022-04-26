export interface StationInfoType {
  errorMessage: ErrorMessageType;
  realtimeArrivalList: RealTimeArrivalListType[];
}

export interface ErrorMessageType {
  code: string;
  developerMessage: string;
  link: string;
  message: string;
  status: number;
  total: number;
}

export interface RealTimeArrivalListType {
  arvlCd: ArvlCd;
  arvlMsg2: string;
  arvlMsg3: string;
  barvlDt: string;
  beginRow: string | null;
  bstatnId: string;
  bstatnNm: string;
  btrainNo: string;
  btrainSttus: string | null;
  curPage: string | null;
  endRow: string | null;
  ordkey: string;
  pageRow: null;
  recptnDt: string;
  rowNum: number;
  selectedCount: number;
  statnFid: string;
  statnId: string;
  statnList: string;
  statnNm: string;
  statnTid: string;
  subwayHeading: "오른쪽" | "왼쪽";
  subwayId: string;
  subwayList: string;
  subwayNm: string | null;
  totalCount: number;
  trainCo: null;
  trainLineNm: string;
  updnLine: "내선" | "외선" | "상행" | "하행";
}

enum ArvlCd {
  진입,
  도착,
  출발,
  전역출발,
  전역진입,
  전역도착,
  운행중,
}
