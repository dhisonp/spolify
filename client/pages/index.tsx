import React, { useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import axios from "axios";

const Home: NextPage = () => {
  // const [spotifyAuthURL, setSpotifyAuthURL] = useState<string>("");
  const server = process.env.SERVER_URL;
  const isDev = process.env.DEV_MODE;
  console.log(isDev);
  console.log(server);

  const handleLogin = () => {
    if (isDev == "TRUE") {
      window.location.href = "/dashboard";
    }

    axios
      .get(server + "/login")
      .then((res) => {
        window.location.href = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container mx-auto min-w-full font-mono text-gray-900">
      <Head>
        <title>Spolify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center min-h-screen bg-stone-100 py-2">
        <h1 className="text-4xl font-bold">
          Welcome to <a className="text-fuchsia-800">Spolify</a>
        </h1>

        <p className="mt-3 text-xl">Music under control.</p>

        <button
          className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full"
          onClick={handleLogin}
        >
          <a
            // href="/dashboard"
            className="p-4 mt-4 text-left border-fuchsia-800 border-2 w-72 rounded-xl text-fuchsia-800 focus:text-fuchsia-800
                            hover:bg-fuchsia-800 transition duration-200 hover:text-gray-100"
          >
            <h3 className="text-xl font-bold text-left">Login &rarr;</h3>
            <p className="mt-4 text-lg">Login via Spotify.</p>
          </a>
        </button>
      </main>
    </div>
  );
};

export default Home;
