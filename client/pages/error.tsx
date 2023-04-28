import Header from "@/components/Header";
import HelpBox from "@/components/HelpBox";
import Head from "next/head";
import Link from "next/link";

const Error = () => {
  return (
    <div className="min-w-screen min-h-screen text-gray-800 bg-stone-100 flex flex-col">
      <Head>
        <title>Spolify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="flex-grow flex flex-col justify-center items-center">
        <span className="text-xl text-red-800 mb-4">Loading...</span>
        <HelpBox visible={true} className="px-2 py-2">
          <p>
            If you are stuck in this screen, you are probably logged out. Or
            perhaps accessing a feature that is locked behind a certain
            procedure.
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
    </div>
  );
};
export default Error;
