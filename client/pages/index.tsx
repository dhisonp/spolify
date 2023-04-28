import React, { useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import { BsSpotify } from "react-icons/bs";
import { handleClientScriptLoad } from "next/script";
import Header from "../components/Header";

const Home: NextPage = () => {
  // const [spotifyAuthURL, setSpotifyAuthURL] = useState<string>("");
  const server = process.env.SERVER_URL;
  console.log(server);

  const handleLogin = () => {
    axios
      .get(server + "/login")
      .then((response) => {
        window.location.href = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const descriptionWhatIs =
    "Enhance your music discovery experience with Spolify– a barebones yet effective music recommender. Adjust your recommendation settings and create tailored playlists.";

  const descriptionStatus =
    "This app is still under development, and Spotify requires the developer to register potential authenticated users. Please contact me if you're interested in testing the app.";

  const descriptionDev =
    "Our application is currently in its prototype/MVP stage and will continue to undergo development to further enhance its functionality and user experience. While the application's user interface boasts a minimalistic design, we have made sure it is visually pleasing while prioritizing functionality. For more information on our technology stack and upcoming updates, please refer to the repository linked at the top of this page.";

  return (
    <div className="min-w-screen min-h-screen text-gray-800 bg-stone-100">
      <Head>
        <title>Spolify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="flex flex-col items-center overflow-hidden">
        <div className="bg-stone-900 w-screen justify-center flex items-end p-4 pt-36">
          <div className="font-display text-center text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-fuchsia-500">
            <h1 className="text-5xl sm:text-7xl">
              Welcome to <a className="text-fuchsia-400">Spolify</a>
            </h1>
            <p className="text-4xl sm:text-6xl">
              Playlist power in your hands.
            </p>
          </div>
        </div>

        <div className="w-11/12 border-t-2 border-stone-600 mt-8" />

        <div className="flex flex-col flex-grow sm:flex-row py-8 px-6 sm:px-12">
          <div className="text-left flex-1 sm:w-2/3 pb-6">
            <h1 className="font-serif bold text-4xl">FAQs and Notes</h1>
          </div>
          <dl className="flex-1 sm:w-2/3">
            <dt className="font-semi">What is Spolify?</dt>
            <dd className="">{descriptionWhatIs}</dd>
            <dt className="font-semi mt-4">Anything to know about?</dt>
            <dd className="">{descriptionStatus}</dd>
            <dt className="font-semi mt-4">Developer and Technical Notes</dt>
            <dd className="">{descriptionDev}</dd>
          </dl>
        </div>

        <div className="w-11/12 border-t-2 border-stone-600" />

        <div
          onClick={handleLogin}
          className="cursor-pointer px-6 py-6 m-8 border-fuchsia-800 border-2 flex text-left items-center justify-center group bg-fuchsia-300 text-fuchsia-800 focus:text-fuchsia-800 hover:bg-fuchsia-800 transition duration-200 hover:text-gray-100"
        >
          <BsSpotify
            size="2em"
            className="mr-4 group-hover:text-gray-100 transition duration-200"
          />
          <div className="flex flex-col">
            <span className="text-lg font-medium">Enter the App</span>
            <span className="text-base">Login with Spotify &rarr;</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
