import React from 'react';
import {NextPage} from 'next';
import Head from 'next/head';
import {useRouter} from "next/router";

const Home: NextPage = () => {
    const router = useRouter()

    router.push('/marketplace')

  return (
    <Head>
        <title>Home</title>
      </Head>
  );
};

export default Home;
