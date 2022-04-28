import "../styles/globals.css";
// import "../styles/kakaoMap.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout/Layout";

declare global {
  interface Window {
    kakao: any;
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
