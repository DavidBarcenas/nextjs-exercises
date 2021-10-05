import Head from "next/head";

import Layout from '../components/layout/layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>NextJS Events</title>
        <meta
          name='description'
          content='Find a lot of great events that alow you to envolve...'
        />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
