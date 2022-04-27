// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { API_get } from "../../components/common/api";

interface Data {
  stationInfo: {};
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { stationName } = req.body;
  const REAL_TIME_API_KEY = process.env.NEXT_PUBLIC_REAL_TIME_API_KEY;

  const { data } = await API_get(
    `http://swopenapi.seoul.go.kr/api/subway/${REAL_TIME_API_KEY}/json/realtimeStationArrival/0/20/${encodeURI(
      stationName
    )}`
  );

  res.status(200).json({ stationInfo: data });
}
