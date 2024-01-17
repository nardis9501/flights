import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";

export default function Layout(props) {
  const [text, setText] = useState("");
  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setText("ligth");
    } else {
      document.documentElement.classList.remove("dark");
      setText("dark");
    }
  }, []);
  const handlerClick = (e) => {
    e.value;
    if (document.documentElement.classList.toggle("dark")) {
      // Whenever the user explicitly chooses dark mode
      localStorage.theme = "dark";
      setText("ligth");
    } else {
      // Whenever the user explicitly chooses light mode
      localStorage.theme = "light";
      setText("dark");
    }

    // Whenever the user explicitly chooses to respect the OS preference
    // localStorage.removeItem("theme");
  };
  return (
    <>
      <div className="absolute conteiner p-2 top-0 left-0 w-full h-screen bg-gradient-to-r from-sky-700 to-teal-500 dark:bg-gradient-to-r dark:from-sky-950 dark:to-teal-950">
        <div className="flex  items-center place-content-between">
          <Link
            className="capitalize text-amber-600 text-xl md:text-3xl"
            to={"/"}
          >
            flights
          </Link>
          <button
            onClick={handlerClick}
            className="dark:text-slate-300 text-slate-600"
          >
            {text}
          </button>
        </div>
        <Outlet />
      </div>
    </>
  );
}
