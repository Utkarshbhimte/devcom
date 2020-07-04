import React from "react";
import "styles/global.scss";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import "util/analytics.js";
import { ProvideAuth } from "util/auth.js";

if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  Sentry.init({
    dsn: "ENTER_YOUR_SENTRY_DSN_HERE",
  });
}
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
