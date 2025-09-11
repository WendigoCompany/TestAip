import NavBar from "@/components/Nav.tsx";
import { useEffect } from "react";
import "@/styles/global.css";

type AppProps = {
  Component: React.ComponentType<any>;
  pageProps: any;
};

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NavBar />
      <Component {...pageProps} />
    </>
  );
}


