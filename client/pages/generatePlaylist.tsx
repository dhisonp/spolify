import Head from "next/head";
import React, { ChangeEvent, useEffect, useState } from "react";
import Button from "@/components/Button";
import { useRouter } from "next/router";
import InputField from "@/components/InputField";
import axios from "axios";
import Header from "@/components/Header";
import Alert from "@/components/Alert";
import Error from "./error";

interface FormValues {
  title: string;
  uris: {
    uri1: string;
    uri2: string;
    uri3: string;
    uri4: string;
    uri5: string;
  };
  isIndie: boolean;
  isAcoustic: boolean;
  size: number;
}

const GeneratePlaylist = () => {
  const server = process.env.SERVER_URL;
  const router = useRouter();
  const initialValues: FormValues = {
    title: "",
    uris: {
      uri1: "",
      uri2: "",
      uri3: "",
      uri4: "",
      uri5: "",
    },
    isAcoustic: false,
    isIndie: false,
    size: 12,
  };
  const [formValues, setFormValues] = useState<FormValues>(initialValues);
  const [displayHelper, toggleHelper] = useState(false);
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

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      window.location.href = "/";
    }
  }, []);

  const validate = () => {
    var isValid = true;
    if (formValues.title == "") {
      isValid = false;
    }
    if (
      formValues.uris.uri1 +
        formValues.uris.uri2 +
        formValues.uris.uri3 +
        formValues.uris.uri4 +
        formValues.uris.uri5 ==
      ""
    ) {
      isValid = false;
    }
    return isValid;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;

    if (name.startsWith("uri")) {
      // If the name starts with "uris.", update the `uris` object
      const uriName = name;
      setFormValues((prevValues) => ({
        ...prevValues,
        uris: {
          ...prevValues.uris,
          [uriName]: value,
        },
      }));
    } else if (name === "size") {
      setFormValues((prevValues) => ({
        ...prevValues,
        size: parseInt(value),
      }));
    } else {
      // Otherwise, update the other fields as before
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const debug = () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      console.error("No access token found in local storage");
      return;
    }
    axios
      .post(server + "/recommend", formValues, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        if (error.response) {
          console.error("Response status:", error.response.status);
          console.error("Response data:", error.response.data);
        }
      });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // const isValid = validate();
    // if (!isValid) {
    //   toggleAlert(true);
    //   return;
    // }

    // Check if user is logged in
    const token = localStorage.getItem("access_token");
    if (!token) {
      console.error("No access token found in local storage");
      return;
    }

    // To accomodate for missing values
    const postData: FormValues = {
      title: formValues.title == "" ? "Spolify Untitled" : formValues.title,
      uris: formValues.uris,
      isAcoustic: formValues.isAcoustic,
      isIndie: formValues.isIndie,
      size: formValues.size,
    };
    axios
      .post(server + "/recommend", postData, {
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
                title: postData.title,
              },
            },
            "/preview",
            { shallow: true }
          );
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

  const handleBack = () => {
    router.back();
  };

  const handleGuide = () => {
    toggleHelper(true);
  };

  const handleReset = (e: any) => {
    e.preventDefault();
    setFormValues(initialValues);
  };

  const operationGuideString = {
    p1: `How do I use the app? `,
    p2: "1. Enter the artist or name of the track or it's Spotify link.",
    p3: 'e.g. "SZA - Good Days", "Easy by Mac Ayres", "Billie Eilish", etc.',
    p4: "2. Feel free to play with some of the niche options, like 'Acoustic' or 'Unpopular'.",
    p5: "3. 'Generate' will create a new playlist under your account and you'll be redirected!",
    p6: "Note: Albums and Artist recommendation in development.",
  };

  const fieldPlaceholders = {
    1: "SZA - Good Days",
    2: "Easy by Mac Ayres",
    3: "https://open.spotify.com/track/1jBKtzlwTVtCrScpiiHiKT?si=dee3a26e7b1d4758",
    4: "Artist + track name, or just a link",
    5: "Artist + track name, or just a link",
  };

  return (
    <div className=" bg-stone-100 text-gray-900 min-h-screen flex flex-col">
      <Head>
        <title>Generate Playlist</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <Alert
        className="alert-error"
        visible={displayAlert}
        setVisible={toggleAlert}
        message="Please make sure Title is filled."
      />

      <main className="flex flex-col sm:flex-grow sm:justify-center overflow-auto sm:pb-0 sm:pt-0 pt-4 pb-16">
        <div className="text-gray-500 mb-3 text-left px-4 flex-col flex items-center">
          {/* <button onClick={handleGuide} className="p-2 mt-2"> */}
          <p className="text-gray-500 text-base hover:text-gray-400 p-2 mt-2">
            {operationGuideString.p1}&rarr;
          </p>
          {/* </button> */}
          {true && (
            <div className="text-gray-500 border-2 border-emerald-600 border-opacity-70 bg-stone-200 bg-opacity-30 px-6 py-4">
              <p>{operationGuideString.p2}</p>
              <p>{operationGuideString.p3}</p>
              <p>{operationGuideString.p4}</p>
              <p>{operationGuideString.p5}</p>
              <span className="text-sm text-gray-400">
                {operationGuideString.p6}
              </span>
            </div>
          )}
        </div>
        <form
          className="flex flex-col items-center px-2 justify-center"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col mb-4">
            <InputField
              placeholder="Title of the playlist."
              label="Title"
              className="mb-2"
              name="title"
              value={formValues.title}
              onChange={handleChange}
            />
            <div className="items-center flex">
              <label className="text-lg font-medium mr-14">Size</label>
              <span className="text-gray-500 mr-4 text-lg w-4">
                {formValues.size}
              </span>
              <input
                type="range"
                min="5"
                max="30"
                name="size"
                value={formValues.size}
                onChange={handleChange}
                className="cursor-pointer range range-xs accent-fuchsia-700 w-3/5"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-center items-center">
            <div className="flex flex-col">
              <InputField
                placeholder={fieldPlaceholders["1"]}
                label="1. "
                name="uri1"
                value={formValues.uris.uri1}
                onChange={handleChange}
              />
              <InputField
                placeholder={fieldPlaceholders["2"]}
                label="2. "
                name="uri2"
                value={formValues.uris.uri2}
                onChange={handleChange}
              />
              <InputField
                placeholder={fieldPlaceholders["3"]}
                label="3. "
                name="uri3"
                value={formValues.uris.uri3}
                onChange={handleChange}
              />
              <InputField
                placeholder={fieldPlaceholders["4"]}
                label="4. "
                name="uri4"
                value={formValues.uris.uri4}
                onChange={handleChange}
              />
              <InputField
                placeholder={fieldPlaceholders["5"]}
                label="5. "
                name="uri5"
                value={formValues.uris.uri5}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col mx-4">
              <li className="flex flex-row mb-2 items-center">
                <input
                  className="mr-2 align-middle checkbox checkbox-sm"
                  type="checkbox"
                  name="isAcoustic"
                  checked={formValues.isAcoustic}
                  onChange={handleChange}
                />
                <label className="text-lg font-medium">Acoustic</label>
              </li>
              <li className="flex flex-row mb-2 items-center">
                <input
                  className="mr-2 align-middle checkbox checkbox-sm"
                  type="checkbox"
                  name="isIndie"
                  checked={formValues.isIndie}
                  onChange={handleChange}
                />
                <label className="text-lg font-medium">Unpopular</label>
              </li>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center mt-4 w-full sm:w-auto">
            {/* <button
              className="m-2 border-2 py-2 px-4 border-emerald-600 rounded-2xl hover:bg-emerald-600 hover:text-gray-100 transition duration-200"
              onClick={handleBack}
            >
              <span className="font-bold">&larr; Back</span>
            </button> */}
            <button
              className="w-4/6 sm:w-auto mb-2 mx-2 border-2 py-3 sm:py-2 px-4 border-emerald-600 rounded-2xl hover:bg-emerald-600 hover:text-gray-100 transition duration-200"
              type="reset"
              onClick={handleReset}
            >
              <span className="font-bold">Reset</span>
            </button>
            <button
              className="sm:w-auto w-5/6 mb-2 mx-2 border-2 py-3 sm:py-2 px-4 border-emerald-700 rounded-2xl bg-emerald-700 text-gray-100 transition duration-200 hover:border-emerald-300 hover:bg-emerald-300 hover:text-fuchsia-900"
              type="submit"
            >
              <span className="font-bold">Generate &rarr;</span>
            </button>
            {/* <button
              onClick={debug}
              type="button"
              className="m-2 border-2 py-2 px-4 border-emerald-700 rounded-2xl bg-emerald-700 text-gray-100 transition duration-200 hover:border-emerald-300 hover:bg-emerald-300 hover:text-fuchsia-900"
            >
              <span className="font-bold">Debug</span>
            </button> */}
          </div>
        </form>
      </main>
    </div>
  );
};

export default GeneratePlaylist;
