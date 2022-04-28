import Image from "next/image";

export default function NotFound() {
  return (
    <div style={{ maxWidth: "375px", margin: "0 auto" }}>
      <h1>404 낫파운드!</h1>
      <Image alt="404" src="/실수.jpeg" width="375px" height="250px" />
    </div>
  );
}
