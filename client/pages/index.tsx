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
        alert("Error loging in– please try again!");
        window.location.href = "/";
      });
  };

  const descriptionWhatIs =
    "Elevate your music discovery with Spolify – a simple yet powerful music recommendation platform. Customize your recommendations and create personalized playlists to match your mood and preferences. Playlist power in your hands.";

  const descriptionStatus =
    "Spolify currently requires permission from the developer to allow Spotify authentication, and hence access to the app. Please contact us if you're interested in testing the app. For more information on our technology stack and upcoming updates, please refer to the repository linked at the top of this page.";

  const descriptionDev =
    "While Spotify is known for its outstanding recommendation features, its rather simple usability may limit the full potential of its algorithm. Spolify, on the other hand, offers a user-friendly and intuitive interface that leverages Spotify's audio features, such as valence, liveness, and acousticness, to provide users with personalized recommendations. Whether you're in the mood for acoustic songs similar to John Mayer's or looking for a Giveon mood with less heartbreak stories, you got it. With Spolify, the power to customize your music experience is in your hands.";

  return (
    <div className="min-w-screen min-h-screen text-gray-800 bg-stone-100">
      <Head>
        <title>Spolify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="flex flex-col items-center overflow-hidden">
        <div className="bg-slate-900 w-screen justify-center flex items-end p-4 pt-36">
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
          <div className="text-left sm:w-2/5 pb-6 flex-1 sm:flex-auto">
            <h1 className="font-serif bold text-4xl">FAQs and Notes</h1>
          </div>
          <dl className="sm:w-3/5 flex-1 sm:flex-auto">
            <dt className="font-semi">What is Spolify?</dt>
            <dd className="">{descriptionWhatIs}</dd>
            <dt className="font-semi mt-4">Anything to know about?</dt>
            <dd className="">{descriptionStatus}</dd>
            <dt className="font-semi mt-4">
              Why use Spolify instead of just Spotify?
            </dt>
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
