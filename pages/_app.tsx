import NavBar from "@/components/Nav.tsx";
import { useEffect } from "react";
import "@/styles/global.css";

type AppProps = {
  Component: React.ComponentType<any>;
  pageProps: any;
};

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-white text-black dark:bg-gray-900 dark:text-gray-100 min-h-screen transition-colors">
      <NavBar />
      <Component {...pageProps} />
    </div>
  );
}
