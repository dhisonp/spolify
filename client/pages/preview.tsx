import Header from "@/components/Header";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { TbPlaylist } from "react-icons/tb";
import axios from "axios";
import Link from "next/link";
import Alert from "@/components/Alert";
import Dashboard from "./dashboard";
import Error from "./error";

interface Recommendation {
  artist: string;
  id: string;
  index: number;
  track_name: string;
  url: string;
  album_name: string;
  album_cover_url: string;
}

const Preview = () => {
  const router = useRouter();
  const { data, title }: any = router.query;
  if (!data) {
    return <Error />;
  }
  const recommendations: Recommendation[] = JSON.parse(data);

  const [displayAlert, toggleAlert] = useState(false);

  useEffect(() => {
    let timeoutId: any;

    if (displayAlert) {
      timeoutId = setTimeout(() => {
        toggleAlert(false);
      }, 5000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [displayAlert]);

  const onClickTrack = (url: string) => {
    window.open(url, "_blank")?.focus();
  };

  const handleCreate = () => {
    const server = process.env.SERVER_URL;
    const params = {
      title: title,
      seeds: recommendations,
    };

    const token = localStorage.getItem("access_token");
    if (!token) {
      console.error("No access token found in local storage");
      return;
    }

    axios
      // .post(server + "/create_playlist_custom", formValues, {
      .post(server + "/create_playlist_custom", params, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        if (response.data != null) {
          window.open(response.data, "_blank")?.focus();
          toggleAlert(true);
        }
      })
      .catch((error) => {
        console.error("Error creating playlist:", error);
        if (error.response) {
          alert("Generate failed. Please check your inputs!");
          console.error("Response status:", error.response.status);
          console.error("Response data:", error.response.data);
        }
      });
  };

  const displayTrack = (element: Recommendation) => {
    return (
      <div
        className="items-center justify-center flex flex-col"
        key={element.index}
      >
        <li
          onClick={() => onClickTrack(element.url)}
          className="flex flex-col sm:flex-row justify-between sm:items-center px-4 sm:px-8 py-4 w-5/6 cursor-pointer hover:opacity-75 transition duration-100"
        >
          <div className="sm:w-6/12 flex items-center mb-2 sm:mb-0">
            <span className="w-6 text-stone-500 text-left">
              {element.index}
            </span>
            <img src={element.album_cover_url} className="h-12 w-12 mr-2" />
            <div className="">
              <p className="text-fuchsia-800">{element.track_name}</p>
              <p className="text-stone-600 text-sm">{element.artist}</p>
            </div>
          </div>
          <div className="sm:w-5/12 text-emerald-700 text-opacity-90">
            {element.album_name}
          </div>
        </li>
        <div className=" border-b-2 border-slate-700 w-5/6" />
      </div>
    );
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className=" bg-stone-100 mx-auto min-h-screen w-screen font-sans text-gray-800">
      <Head>
        <title>Preview</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <Alert
        className="alert-success"
        visible={displayAlert}
        setVisible={toggleAlert}
        message="Playlist created! Check your Spotify account."
      />

      <main className="flex flex-col justify-between items-center overflow-auto pt-8 px-2 sm:px-4 min-h-full">
        <h2 className="text-2xl font-medium text-fuchsia-800 mb-8 py-6 px-6 text-center border-2 border-fuchsia-800 flex items-center">
          <TbPlaylist size="1em" className="mr-4" />
          {title}
        </h2>
        <ul className="flex flex-col w-full">
          {recommendations.map((element: Recommendation) =>
            displayTrack(element)
          )}
        </ul>
        <div
          onClick={handleCreate}
          className="cursor-pointer m-12 px-6 py-6 border-fuchsia-800 border-2 flex text-left items-center justify-center group bg-fuchsia-300 text-fuchsia-800 focus:text-fuchsia-800 hover:bg-fuchsia-800 transition duration-200 hover:text-gray-100"
        >
          <BsArrowRightCircleFill
            size="2em"
            className="mr-4 group-hover:text-gray-100 transition duration-200"
          />
          <div className="flex flex-col">
            <span className="text-lg font-medium">
              Export{" "}
              <span className="text-emerald-800 group-hover:text-gray-100 transition duration-200">
                {title}
              </span>
            </span>
            <span className="text-base">to Spotify &rarr;</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Preview;
