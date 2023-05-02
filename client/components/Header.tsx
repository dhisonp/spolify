import Link from "next/link";

const Header = () => {
  // Move "version" to ENV or look for the best practice
  const version = "a1.0";
  return (
    <div className="flex text-md text-lg px-4 py-2 text-emerald-400 gap-x-4 bg-slate-900 w-screen">
      <Link
        href="https://github.com/dhisonp"
        className="opacity-70 hover:opacity-100"
      >
        GitHub
      </Link>
      <Link
        href="https://instagram.com/dhisvn"
        className="opacity-70 hover:opacity-100"
      >
        Instagram
      </Link>
      <Link
        href="https://github.com/dhisonp/spolify"
        className="text-emerald-200 opacity-70 hover:opacity-100"
      >
        Repo
      </Link>
      <Link href="/" className=" ml-auto hidden sm:block">
        <span className="text-slate-500">
          Spolify <span className="text-slate-600">version {version} by </span>
          Dhison Padma
        </span>
      </Link>
      <Link
        href="/"
        className="ml-auto sm:hidden block text-emerald-200 opacity-70 hover:opacity-100"
      >
        Home
      </Link>
    </div>
  );
};

export default Header;
