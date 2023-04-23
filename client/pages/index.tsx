import React, { useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import { BsSpotify } from "react-icons/bs";
import { handleClientScriptLoad } from "next/script";
import Header from "../components/Header";

const Home: NextPage = () => {
  // const [spotifyAuthURL, setSpotifyAuthURL] = useState<string>("");
  const server = process.env.SERVER_URL;
  console.log(server);
  const isDev = process.env.DEV_MODE;

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
    <div className="min-w-full text-gray-800 bg-stone-200">
      <Head>
        <title>Spolify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="flex flex-col items-center justify-between min-h-screen bg-emerald-100 overflow-hidden">
        <div className="bg-stone-900 w-screen justify-center flex items-end p-4 pt-48">
          <div className="font-display text-center text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-fuchsia-500">
            <h1 className="text-5xl sm:text-7xl">
              Welcome to <a className="text-fuchsia-400">Spolify</a>
            </h1>
            <p className="text-4xl sm:text-6xl">
              Playlist power in your hands.
            </p>
          </div>
        </div>
        <dl className="px-8 py-6 sm:px-24 md:px-48 text-sm sm:text-base bg-emerald-100 flex flex-col">
          <dt className="font-semi">What is Spolify?</dt>
          <dd className="">{descriptionWhatIs}</dd>
          <dt className="font-semi mt-4">Anything to know about?</dt>
          <dd className="">{descriptionStatus}</dd>
          <dt className="font-semi mt-4">Developer and Technical Notes</dt>
          <dd className="">{descriptionDev}</dd>
        </dl>
        <div
          onClick={handleLogin}
          className="self-end cursor-pointer py-16 flex text-left items-center justify-center w-screen px-6 group bg-fuchsia-300 text-fuchsia-800 focus:text-fuchsia-800 hover:bg-fuchsia-800 transition duration-200 hover:text-gray-100"
        >
          <BsSpotify
            size="3em"
            className="mr-4 group-hover:text-gray-100 transition duration-200"
          />
          <div className="flex flex-col">
            <span className="text-xl font-medium">Enter the App</span>
            <span className="text-lg">Login with Spotify &rarr;</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
