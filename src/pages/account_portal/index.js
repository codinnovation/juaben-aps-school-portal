import React, { useEffect } from "react";
import Head from "next/head";
import Layout from "./layout";
import { useRouter } from "next/router";
import { auth } from "../../lib/firebase";
import MainBody from "../account_portal/mainBody";

function Index() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Juaben APS - Accountant Dashboard</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <MainBody />
      </Layout>
    </>
  );
}

export default Index;
