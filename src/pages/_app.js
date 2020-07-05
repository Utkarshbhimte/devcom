import React from "react";
import Router from "next/router";
import NProgress from "nprogress"; //nprogress module
import * as Sentry from "@sentry/browser";

import "styles/global.scss";
import "styles/PageLoader.scss";

import Navbar from "components/Navbar";
import Footer from "components/Footer";
import "util/analytics.js";
import { ProvideAuth } from "util/auth.js";
import { DefaultSeo } from "next-seo";

if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  });
}

//Binding events.
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

class MyApp extends React.Component {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  componentDidCatch(error, errorInfo) {
    Sentry.withScope((scope) => {
      Object.keys(errorInfo).forEach((key) => {
        scope.setExtra(key, errorInfo[key]);
      });

      Sentry.captureException(error);
    });

    super.componentDidCatch(error, errorInfo);
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <ProvideAuth>
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
          <Navbar
            color="white"
            spaced={true}
            logo="https://uploads.divjoy.com/logo.svg"
          ></Navbar>

          <Component {...pageProps} />

          <Footer
            color="light"
            size="normal"
            backgroundImage=""
            backgroundImageOpacity={1}
            copyright="© 2019 Company"
            logo="https://uploads.divjoy.com/logo.svg"
          ></Footer>
        </>
      </ProvideAuth>
    );
  }
}

export default MyApp;
