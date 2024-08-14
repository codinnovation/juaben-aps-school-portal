import React, { useEffect } from "react";
import FirstHeader from "./firstHeading";
import MainBody from "./mainBody";
import { useRouter } from "next/router";
import Head from "next/head";
import withSession from "@/lib/session";
import StudentProfilePage from "./student-profile/studentProfilePage";

function Index({user}) {
  const router = useRouter();

  return (
    <>
        <>
          <Head>
            <title>Juaben APS - Parent&apos;s Dashboard</title>
            <meta name="description" content="Generated by create next app" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
          </Head>
          <StudentProfilePage user={user}/>
        </>
 
    </>
  );
}

export default Index;



export const getServerSideProps = withSession(async function ({ req, res }) {
  const user = req.session.get("user");
  if (!user || !user.displayName.startsWith("Parent")) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
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