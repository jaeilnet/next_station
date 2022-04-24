import "../styles/globals.css";
import "../styles/customOverlay.css";
import type { AppProps } from "next/app";

declare global {
  interface Window {
    kakao: any;
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
