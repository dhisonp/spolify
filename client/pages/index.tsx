import React, { useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import axios from "axios";
const Home: NextPage = () => {
    // const [spotifyAuthURL, setSpotifyAuthURL] = useState<string>("");
    const server = process.env.SERVER_URL;
    const handleLogin = () => {
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
        <div className="container mx-auto">
            <Head>
                <title>Spolify</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="flex flex-col items-center justify-center min-h-screen py-2">
                <h1 className="text-6xl font-bold">
                    Welcome to <a className="text-blue-600">Spolify</a>
                </h1>

                <p className="mt-3 text-2xl">Music under control.</p>

                <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
                    <a
                        onClick={handleLogin}
                        className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
                    >
                        <h3 className="text-2xl font-bold">Login &rarr;</h3>
                        <p className="mt-4 text-xl">
                            Login using your Spotify account.
                        </p>
                    </a>
                </div>
            </main>
        </div>
    );
};

export default Home;
