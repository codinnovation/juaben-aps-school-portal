import React from "react";
import Head from "next/head";
import MainBody from "./mainBody";
import Layout from "./layout";
import { auth } from "../../lib/firebase";
import withSession from "@/lib/session";

function Index({ user }) {

  return (
    <>
      <>
        <Head>
          <title>Juaben APS - Administrator Dashboard</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/logo2.png" />
        </Head>
        <Layout>
          <MainBody user={user} />
        </Layout>
      </>
    </>
  );
}

export default Index;

export const getServerSideProps = withSession(async function ({ req, res }) {
  const user = req.session.get("user");
  if (!user || user?.displayName !== "Administrator") {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  auth.signOut();

  if (user) {
    req.session.set("user", user);
    await req.session.save();
  }

  return {
    props: {
      user: user,
    },
  };
});