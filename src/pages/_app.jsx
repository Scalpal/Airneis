import "@/styles/global.css";
import "@/styles/inputRange.css";
import Layout from "@/web/components/Layout";
import { Montserrat, Nunito } from "@next/font/google";
import { AppContextProvider } from "@/web/hooks/useAppContext.jsx";
import Head from "next/head";
import { appWithTranslation } from "next-i18next";


export const classnames = require("classnames");

export const montserrat = Montserrat({
  variable: ["100", "200", "300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const nunito = Nunito({
  variable: ["100", "200", "300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

function App({ Component, pageProps }) {
  const renderWithLayout =
    Component.getLayout ||
    ((page) => {
      return <Layout>{page}</Layout>;
    });

  return (
    <AppContextProvider>
      <Head>
        <title> Airneis </title>
        <meta name="description" content="Airneis" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/circle.png" />
      </Head>
      
      {renderWithLayout(
        <Component {...pageProps} />
      )}
    </AppContextProvider>
  );
}

export default appWithTranslation(App);
