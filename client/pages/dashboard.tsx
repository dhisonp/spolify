import Head from "next/head";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Button from "@/components/Button";

const Dashboard = () => {
  const router = useRouter();
  const [displayHelper, toggleHelper] = useState(false);

  const handleOnClickHelper = () => {
    toggleHelper(true);
  };

  const handleOnClickAutoGenerate = () => {
    alert("API call to server!");
  };

  const handleOnClickCustomGenerate = () => {
    router.push("/generatePlaylist");
  };

  const helperText1 =
    '"Auto Generate" automatically generates a playlist based on your top items with pre determined settings.';
  const helperText2 =
    'For more customization and tailoring, "Custom Generator" is for you!';
  const tempData = {
    user: {
      imgUrl: "https://avatars.githubusercontent.com/u/67208312?v=4",
      name: "Dhison Padma",
    },
  };

  return (
    <div className=" bg-stone-100 mx-auto w-screen font-mono text-gray-900">
      <Head>
        <title>Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center min-h-screen py-2">
        <div className="flex flex-col">
          <div className="px-6 py-3 h-auto flex flex-row items-center justify-center my-2">
            <div className="mr-6">
              <img
                className="w-36 h-36 rounded-full border border-stone-200"
                src={tempData.user.imgUrl}
              />
            </div>
            <span className="font-bold text-6xl text-fuchsia-950">
              {tempData.user.name}
            </span>
          </div>
          <div className="my-2 text-lg px-6 py-3 w-auto h-12 flex flex-row items-center justify-between">
          <Button onClick={handleOnClickCustomGenerate} className="border-red-700 hover:bg-red-700 text-red-700">
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
      </main>
    </div>
  );
};

export default Dashboard;