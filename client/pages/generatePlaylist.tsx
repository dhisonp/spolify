import Head from "next/head";
import React, { ChangeEvent, useState } from "react";
import Button from "@/components/Button";
import { useRouter } from "next/router";
import InputField from "@/components/InputField";
import axios from "axios";
import { log } from "console";
import Header from "@/components/Header";

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
  const [formValues, setFormValues] = useState<FormValues>({
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
    size: 15,
  });
  const [displayHelper, toggleHelper] = useState(false);

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) {
      alert("Please check your inputs!");
      return;
    }
    const token = localStorage.getItem("access_token");
    if (!token) {
      console.error("No access token found in local storage");
      return;
    }
    axios
      .post(server + "/create_playlist_custom", formValues, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        if (response.data != null) {
          window.open(response.data, "_blank")?.focus();
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

  const operationGuideString = {
    p1: `Operation Guide `,
    p2: "1. Enter the artist and name of the song or just the link.",
    p3: 'e.g. "SZA - Good Days", "Billie Happier Than Ever", up to five.',
    p4: "2. Feel free to play with some of the niche options, like 'Acoustic' or 'Unpopular'.",
    p5: "3. 'Generate' will create a new playlist under your account and you'll be redirected!",
    p6: "Note: Albums and Artist recommendation in development.",
  };

  const fieldPlaceholder = "Artist + Name or Link";

  return (
    <div className=" bg-stone-100 mx-auto text-gray-900 min-h-screen">
      <Head>
        <title>Generate Playlist</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <main className="flex flex-col justify-between overflow-auto pt-16 pb-8">
        <div className="text-gray-500 mb-3 text-left px-4 flex-col flex items-center">
          <button onClick={handleGuide}>
            <p className="text-gray-500 text-base hover:text-gray-400 mb-2 mt-4">
              {operationGuideString.p1}&rarr;
            </p>
          </button>
          {displayHelper && (
            <div className="text-gray-500">
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
        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <InputField
              placeholder="Name of the playlist."
              label="Title"
              className="mt-2"
              name="title"
              value={formValues.title}
              onChange={handleChange}
            />
            <div className="items-center flex mt-2">
              <label className="text-lg font-medium mr-12">Size</label>
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
                className="cursor-pointer range accent-fuchsia-700 w-3/5"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-center items-center mt-4 sm:mt-8">
            <div className="flex flex-col p-4">
              <InputField
                placeholder={fieldPlaceholder}
                label="1. "
                name="uri1"
                value={formValues.uris.uri1}
                onChange={handleChange}
              />
              <InputField
                placeholder={fieldPlaceholder}
                label="2. "
                name="uri2"
                value={formValues.uris.uri2}
                onChange={handleChange}
              />
              <InputField
                placeholder={fieldPlaceholder}
                label="3. "
                name="uri3"
                value={formValues.uris.uri3}
                onChange={handleChange}
              />
              <InputField
                placeholder={fieldPlaceholder}
                label="4. "
                name="uri4"
                value={formValues.uris.uri4}
                onChange={handleChange}
              />
              <InputField
                placeholder={fieldPlaceholder}
                label="5. "
                name="uri5"
                value={formValues.uris.uri5}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col mx-4">
              <li className="flex flex-row mb-2 items-center">
                <input
                  className="mr-2 align-middle"
                  type="checkbox"
                  name="isAcoustic"
                  checked={formValues.isAcoustic}
                  onChange={handleChange}
                />
                <label className="text-lg font-medium">Acoustic</label>
              </li>
              <li className="flex flex-row mb-2 items-center">
                <input
                  className="mr-2 align-middle"
                  type="checkbox"
                  name="isIndie"
                  checked={formValues.isIndie}
                  onChange={handleChange}
                />
                <label className="text-lg font-medium">Unpopular</label>
              </li>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <button
              className="m-2 border-2 py-2 px-4 border-emerald-600 rounded-full hover:bg-emerald-600 hover:text-gray-100 transition duration-200"
              onClick={handleBack}
            >
              <span className="font-bold">&larr; Back</span>
            </button>
            <button
              className="m-2 border-2 py-2 px-4 border-emerald-600 rounded-full hover:bg-emerald-600 hover:text-gray-100 transition duration-200"
              type="reset"
            >
              <span className="font-bold">Reset</span>
            </button>
            <button
              className="m-2 border-2 py-2 px-4 border-emerald-700 rounded-full bg-emerald-700 text-gray-100 transition duration-200 hover:border-emerald-300 hover:bg-emerald-300 hover:text-fuchsia-900"
              type="submit"
            >
              <span className="font-bold">Generate &rarr;</span>
            </button>
            {/* <button
              onClick={debug}
              type="button"
              className="m-2 border-2 py-2 px-4 border-emerald-700 rounded-full bg-emerald-700 text-gray-100 transition duration-200 hover:border-emerald-300 hover:bg-emerald-300 hover:text-fuchsia-900"
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
