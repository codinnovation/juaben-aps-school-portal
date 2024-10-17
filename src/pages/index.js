import Head from "next/head";
import Portals from "./choose-portal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import withSession from "@/lib/session";

function Home({ user }) {

  return (
    <>
      <Head>
        <title>Juaben APS - School Management System</title>
        <meta name="description" content="Juaben APS School Management System" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo2.png" />
      </Head>
      <Portals user={user} />
      <ToastContainer user={user} />
    </>
  );
}

export default Home;

export const getServerSideProps = withSession(async function ({ req, res }) {
  const user = req.session.get("user");
  if (!user) {
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
