import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-[12rem]/[13rem] lg:text-[32rem]/[33rem] md:text-[16rem]/[17rem] sm:text-[12rem]/[13rem]">
        404
      </h1>
      <p className="text-lg font-bold m-2 md:text-2xl lg:text-4xl">
        Az ön által keresett oldal nem található!
      </p>
      <Link
        className="text-base md:text-lg md:mt-2 lg:text-xl lg:mt-4 underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
        to="/"
      >
        Vissza a főoldalra
      </Link>
    </div>
  );
}
