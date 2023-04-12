import Head from "next/head";
import React from "react";

import Button from "@/components/Button";

const Login = () => {
  const handleClick = () => {
    alert("Click!");
  };

  return (
    <div className=" bg-stone-100 mx-auto">
      <Head>
        <title>Spolify - Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center min-h-screen py-2">
        <Button onClick={handleClick}>Login using Spotify</Button>
      </main>
    </div>
  );
};

export default Login;
