import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import 'isomorphic-fetch';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <title>NextJS TODOs</title>
          <link
            rel="stylesheet"
            href="//unpkg.com/tachyons@4.10.0/css/tachyons.min.css"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
