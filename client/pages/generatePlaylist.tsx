import Head from "next/head";
import React, { ChangeEvent, useState } from "react";
import Button from "@/components/Button";
import { useRouter } from "next/router";

interface FormValues {
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
    uris: {
      uri1: "",
      uri2: "",
      uri3: "",
      uri4: "",
      uri5: "",
    },
    isAcoustic: false,
    isIndie: false,
    size: 10,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission here
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
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
            <div className="flex flex-row justify-center items-center">
              <div className="flex flex-col p-4">
                <div className="flex flex-row items-center">
                  <label className="text-lg font-medium mr-2">1. </label>
                  <input
                    placeholder="Paste link or id"
                    className="bg-gray-50 w-80 py-2 px-4 m-2 rounded-full border-2 border-fuchsia-800 focus:outline-none focus:bg-emerald-50 text-gray-700"
                  />
                </div>
                <div className="flex flex-row items-center">
                  <label className="text-lg font-medium mr-2">2. </label>
                  <input
                    placeholder="Paste link or id"
                    className="bg-gray-50 w-80 py-2 px-4 m-2 rounded-full border-2 border-fuchsia-800 focus:outline-none focus:bg-emerald-50 text-gray-700"
                  />
                </div>
                <div className="flex flex-row items-center">
                  <label className="text-lg font-medium mr-2">3. </label>
                  <input
                    placeholder="Paste link or id"
                    className="bg-gray-50 w-80 py-2 px-4 m-2 rounded-full border-2 border-fuchsia-800 focus:outline-none focus:bg-emerald-50 text-gray-700"
                  />
                </div>
                <div className="flex flex-row items-center">
                  <label className="text-lg font-medium mr-2">4. </label>
                  <input
                    placeholder="Paste link or id"
                    className="bg-gray-50 w-80 py-2 px-4 m-2 rounded-full border-2 border-fuchsia-800 focus:outline-none focus:bg-emerald-50 text-gray-700"
                  />
                </div>
                <div className="flex flex-row items-center">
                  <label className="text-lg font-medium mr-2">5. </label>
                  <input
                    placeholder="Paste link or id"
                    className="bg-gray-50 w-80 py-2 px-4 m-2 rounded-full border-2 border-fuchsia-800 focus:outline-none focus:bg-emerald-50 text-gray-700"
                  />
                </div>
              </div>
              <div className="flex flex-col mx-4">
                <div className="flex flex-row mb-2">
                  <input
                    className="mr-4"
                    type="checkbox"
                    name="agree"
                    value="true"
                  />
                  <label className="text-lg font-medium">Acoustic</label>
                </div>
                <div className="flex flex-row mb-2">
                  <input
                    className="mr-4"
                    type="checkbox"
                    name="agree"
                    value="true"
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
