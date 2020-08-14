import React from "react";
import Router from "next/router";
import Head from "next/head";
import { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import NProgress from "nprogress"; //nprogress module

// import "styles/global.scss";
import "../styles/PageLoader.css";
import "../styles/index.css";

import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer";
import { ProvideAuth } from "../util/auth";
import logo from "../assets/logo-with-text.svg";

NProgress.start();
//Binding events.
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

class MyApp extends React.Component<AppProps> {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <ProvideAuth>
        <Head>
          <link rel="shortcut icon" href="/favicon.png" />
        </Head>
        <DefaultSeo
          title="Devcom | A platform for devs to showcase their projects"
          description="A platform for devs to showcase their projects"
          openGraph={{
            type: "website",
            locale: "en_IE",
            url: "https://devcom.vercel.app/",
            site_name: "Devcom",
          }}
          twitter={{
            handle: "@bhimtebhaisaab",
            // site: "@site",
            // cardType: "summary_large_image",
          }}
        />
        <>
          <div className="min-h-screen">
            <Navbar color="white" spaced={true} logo={logo}></Navbar>
            <Component {...pageProps} />
          </div>

          <Footer
            color="light"
            size="normal"
            backgroundImage=""
            backgroundImageOpacity={1}
            copyright="© 2019 Company"
            logo={logo}
          ></Footer>
        </>
      </ProvideAuth>
    );
  }
}

export default MyApp;
