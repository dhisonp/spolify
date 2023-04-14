import Head from "next/head";
import React, { ChangeEvent, useState } from "react";
import Button from "@/components/Button";
import { useRouter } from "next/router";
import InputField from "@/components/InputField";

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formValues);
    // Handle form submission here
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className=" bg-stone-100 mx-auto w-screen font-mono text-gray-900">
      <Head>
        <title>Generate Playlist</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center min-h-screen py-2">
        <div className="container w-2/3">
          <div className="text-gray-600 mb-2 text-center italic">
            <p>Operation Guide:</p>
            <p>1. Paste the links to an artist/song you like.</p>
            <p>
              2. You can put in up to 5 in total of either artists or songs.
            </p>
            <p>
              3. Feel free to play with some of the advanced options, like
              'Acoustic' and 'Unpopular'.
            </p>
            <p>
              4. Press 'Generate' and you will be redirected to your new
              playlist!
            </p>
          </div>
          <form
            className="flex flex-col justify-center items-center"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col justify-center">
              <InputField
                placeholder="Name of the playlist."
                label="Title"
                className="mt-2"
                name="title"
                value={formValues.title}
                onChange={handleChange}
              />
              <div className="items-center flex">
                <label className="text-lg font-medium mr-12">Size</label>
                <span className="text-gray-500 mr-4 text-lg w-4">{formValues.size}</span>
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
            <div className="flex flex-row justify-center items-center">
              <div className="flex flex-col p-4">
                <InputField
                  placeholder="Paste artist/track link or id here."
                  label="1. "
                  name="uri1"
                  value={formValues.uris.uri1}
                  onChange={handleChange}
                />
                <InputField
                  placeholder="Paste artist/track link or id here."
                  label="2. "
                  name="uri2"
                  value={formValues.uris.uri2}
                  onChange={handleChange}
                />
                <InputField
                  placeholder="Paste artist/track link or id here."
                  label="3. "
                  name="uri3"
                  value={formValues.uris.uri3}
                  onChange={handleChange}
                />
                <InputField
                  placeholder="Paste artist/track link or id here."
                  label="4. "
                  name="uri4"
                  value={formValues.uris.uri4}
                  onChange={handleChange}
                />
                <InputField
                  placeholder="Paste artist/track link or id here."
                  label="5. "
                  name="uri5"
                  value={formValues.uris.uri5}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col mx-4">
                <div className="flex flex-row mb-2">
                  <input
                    className="mr-4"
                    type="checkbox"
                    name="isAcoustic"
                    checked={formValues.isAcoustic}
                    onChange={handleChange}
                  />
                  <label className="text-lg font-medium">Acoustic</label>
                </div>
                <div className="flex flex-row mb-2">
                <input
                    className="mr-4"
                    type="checkbox"
                    name="isIndie"
                    checked={formValues.isIndie}
                    onChange={handleChange}
                  />
                  <label className="text-lg font-medium">Unpopular</label>
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-between items-center">
              <button
                className="mx-2 border-2 py-2 px-4 border-emerald-600 rounded-full hover:bg-emerald-600 hover:text-gray-100 transition duration-200"
                onClick={handleBack}
              >
                <span className="font-bold">&larr; Back</span>
              </button>
              <button
                className="mx-2 border-2 py-2 px-4 border-emerald-600 rounded-full hover:bg-emerald-600 hover:text-gray-100 transition duration-200"
                type="reset"
              >
                <span className="font-bold">Reset</span>
              </button>
              <button
                className="mx-2 border-2 py-2 px-4 border-emerald-700 rounded-full bg-emerald-700 text-gray-100 transition duration-200 hover:border-emerald-300 hover:bg-emerald-300 hover:text-fuchsia-900"
                type="submit"
              >
                <span className="font-bold">Generate &rarr;</span>
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default GeneratePlaylist;
