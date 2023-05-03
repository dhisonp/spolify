import Head from "next/head";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Button from "@/components/Button";
import axios from "axios";
import Header from "@/components/Header";
import HelpBox from "@/components/HelpBox";
import Link from "next/link";
import Divider from "@/components/Divider";

interface userData {
  username: string;
  imageUri: string;
  // ..add more user data, like top items, etc. here first.
}

const Dashboard = () => {
  const DEV_MODE = false;

  const router = useRouter();
  const [displayHelper, toggleHelper] = useState(false);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [userData, setUserData] = useState<userData>({
    username: "",
    imageUri: "",
  });
  const server = process.env.SERVER_URL;

  if (typeof window !== "undefined") {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("access_token");
    if (accessToken) localStorage.setItem("access_token", accessToken);
  }

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    axios
      .get(server + "/user", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setLoggedIn(true);
        const data = res.data;
        console.log(data);
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

  const handleOnClickSaved = () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      console.error("No access token found in local storage");
      return;
    }

    axios
      .get(server + "/saved", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        console.log("Response data:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching saved tracks:", error);
        if (error.response) {
          console.error("Response status:", error.response.status);
          console.error("Response data:", error.response.data);
        }
      });
  };

  const handleOnClickAutoGenerate = () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      console.error("No access token found in local storage");
      return;
    }
    axios
      .get(server + "/auto_recommend", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        if (response.data != null) {
          // window.open(response.data, "_blank")?.focus();
          const data = JSON.stringify(response.data);
          router.push(
            {
              pathname: "/preview",
              query: {
                data: data,
                title: "Spolify Curated",
              },
            },
            "/preview",
            { shallow: true }
          );
        }
      })
      .catch((error) => {
        console.error("Error generating playlist:", error);
        if (error.response) {
          console.error("Response status:", error.response.status);
          console.error("Response data:", error.response.data);
        }
      });
  };

  const handleOnClickCustomGenerate = () => {
    router.push("/generatePlaylist");
  };

  const handleLogOut = async () => {
    try {
      // Make a GET request to the /logout endpoint
      const response = await axios.get(server + "/logout");
      localStorage.removeItem("access_token");
      window.location.href = "/";
      console.log(localStorage.getItem("access_token"));
    } catch (error) {
      console.error(error);
    }
  };

  const helperText1 =
    '"Spolify Curated" automatically generates a playlist in your account based on your top items with pre determined settings.';
  const helperText2 =
    'For more customization and tailoring, "Custom Recommend" is for you!';

  return (
    <div className="flex flex-col bg-stone-100 font-sans text-gray-900 min-h-screen">
      <Head>
        <title>Spolify - {userData.username}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <main className="flex flex-col sm:flex-grow sm:justify-center">
        {loggedIn && userData ? (
          <div className="flex flex-col items-center pt-4 sm:pt-0 justify-center">
            <div className="px-4 py-2 h-auto flex flex-row">
              <div className="mr-4">
                <img
                  className="w-28 h-28 rounded-full border border-stone-200"
                  src={userData.imageUri}
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-gray-600 text-base sm:text-lg">
                  Welcome,{" "}
                </span>
                <h1 className="font-semi text-2xl sm:text-4xl text-stone-800">
                  {userData.username}
                </h1>
              </div>
            </div>
            <Divider className="my-4 w-5/6 sm:w-3/4" />
            <div className="mb-4 text-lg px-2 py-2 w-5/6 items-center justify-center flex flex-col gap-y-2 sm:flex-row sm:gap-y-0">
              <Button
                onClick={handleLogOut}
                className="border-red-700 hover:bg-red-700 text-red-700"
              >
                &larr; Log Out
              </Button>
              <Button
                onClick={handleOnClickAutoGenerate}
                // className="border-emerald-800 hover:bg-emerald-700 text-emerald-800"
              >
                Spolify Curated &rarr;
              </Button>
              <Button onClick={handleOnClickCustomGenerate}>
                Custom Recommend &rarr;
              </Button>
              {DEV_MODE && <Button onClick={handleOnClickSaved}>Debug</Button>}
            </div>
            <div className="justify-center items-center flex flex-col sm:w-4/6">
              <span className="text-gray-500 mb-2">What are these?</span>
              <HelpBox visible={true} className="">
                {helperText1} {helperText2}
              </HelpBox>
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center">
            <span className="text-xl text-red-800 mb-4">Loading...</span>
            <HelpBox visible={true} className="px-2 py-2">
              <p>
                If you are stuck in this screen, you are probably logged out.
              </p>
              <p>
                Press{" "}
                <Link
                  href={"/"}
                  className="underline text-stone-600 hover:text-stone-500"
                >
                  here
                </Link>{" "}
                to get back to home page.
              </p>
            </HelpBox>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
