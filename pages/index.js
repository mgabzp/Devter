import { useEffect } from "react";
import Head from "next/head";

import AppLayout from "components/AppLayout";
import Button from "components/Button";
import GitHub from "components/Icons/GitHub";
import Logo from "components/Icons/Logo";

import { colors } from "styles/theme";

import { loginWithGitHub } from "../firebase/client";

import { useRouter } from "next/router";
import useUser, { USER_STATES } from "hooks/useUser";

export default function Home() {
  const user = useUser();
  const router = useRouter(); //useRouter es un hook que tiene Nextjs

  useEffect(() => {
    user && router.replace("/home");
  }, [user]); //Si tenemos un usuario, y el efecto deberia ejecutarse c/vez que cambie el usuario

  const handleClick = () => {
    loginWithGitHub().catch((err) => {
      console.log(err);
    });
  };

  return (
    <>
      <Head>
        <title>devter 🐦</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppLayout>
        <section>
          <Logo />
          <h1>Devter</h1>
          <h2>
            Talk about development
            <br />
            with developers 🚀
          </h2>

          <div>
            {user === USER_STATES.NOT_LOGGED && (
              <Button onClick={handleClick}>
                <GitHub fill="#fff" width={24} height={24} />
                Login with GitHub
              </Button>
            )}
            {user === USER_STATES.NOT_KNOWN && <img src="/spinner1.gif" />}
          </div>
        </section>
      </AppLayout>

      <style jsx>{`
        img {
          width: 120px;
        }
        div {
          margin-top: 16px;
        }
        section {
          display: grid;
          height: 100%;
          place-content: center;
          place-items: center;
        }
        h1 {
          color: ${colors.primary};
          font-weight: 800;
          font-size: 38px;
          margin-top: 5px;
          margin-bottom: 10px;
        }
        h2 {
          color: ${colors.strong};
          text-align: center;
          font-size: 21px;
          margin: 0;
        }
      `}</style>
    </>
  );
}
