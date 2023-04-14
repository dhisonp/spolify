import Head from "next/head";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Button from "@/components/Button";
import axios from "axios";

interface userData {
  username: string;
  imageUri: string;
  // ..add more user data, like top items, etc. here first.
}

const Dashboard = () => {
  const router = useRouter();
  const [displayHelper, toggleHelper] = useState(false);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [userData, setUserData] = useState<userData>({
    username: "",
    imageUri: "",
  });
  const server = process.env.SERVER_URL;

  useEffect(() => {
    axios
      .get(server + "/user")
      .then((res) => {
        setLoggedIn(true);
        const data = res.data;
        setUserData({
          username: data.display_name,
          imageUri: data.images[0].url,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleOnClickHelper = () => {
    toggleHelper(true);
  };

  const handleOnClickAutoGenerate = () => {
    alert("API call to server!");
  };

  const handleOnClickCustomGenerate = () => {
    router.push("/generatePlaylist");
  };

  const handleLogOut = () => {
    alert("TODO -> delete token or whatever");
  };

  const helperText1 =
    '"Auto Generate" automatically generates a playlist based on your top items with pre determined settings.';
  const helperText2 =
    'For more customization and tailoring, "Custom Generator" is for you!';

  return (
    <div className=" bg-stone-100 mx-auto w-screen font-mono text-gray-900">
      <Head>
        <title>Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center min-h-screen py-2">
        {loggedIn && userData ? (
          <div>
            <div className="flex flex-col">
              <div className="px-6 py-3 h-auto flex flex-row items-center justify-center my-2">
                <div className="mr-6">
                  <img
                    className="w-28 h-28 rounded-full border border-stone-200"
                    src={userData.imageUri}
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-500 text-base">Welcome, </span>
                  <h1 className="font-bold text-4xl text-fuchsia-950">
                    {userData.username}
                  </h1>
                </div>
              </div>
              <div className="my-2 text-lg px-6 py-3 w-auto h-12 flex flex-row items-center justify-between">
                <Button
                  onClick={handleLogOut}
                  className="border-red-700 hover:bg-red-700 text-red-700"
                >
                  &larr; Log Out
                </Button>
                <Button onClick={handleOnClickAutoGenerate}>
                  Auto Recommend &rarr;
                </Button>
                <Button onClick={handleOnClickCustomGenerate}>
                  Custom Recommend &rarr;
                </Button>
              </div>
            </div>
            <div className="my-4 whitespace-normal max-w-4xl items-center justify-center text-center">
              <button onClick={handleOnClickHelper}>
                <span className="text-gray-500 underline">
                  What's the difference?
                </span>
              </button>
              {displayHelper && (
                <div className="text-gray-600">
                  <p className="italic">
                    {helperText1} {helperText2}
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <span className="text-lg">Loading..</span>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
