import Link from "next/link";

const Header = () => {
  return (
    <div className="absolute flex text-md px-4 py-2 text-emerald-400 gap-x-4 bg-stone-900 w-screen">
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
      <Link
        href="/"
        className=" ml-auto hidden sm:block"
      >
        <span className="text-gray-500">
          Spolify <span className="text-gray-600">by </span>Dhison Padma
        </span>
      </Link>
    </div>
  );
};

export default Header;
