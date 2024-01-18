import { useState } from "react";

export default function Size({ parentCallback }) {
  const [size, setSize] = useState(() => {
    const getSizeFromStorage = window.localStorage.getItem("size");
    {
      return getSizeFromStorage ? getSizeFromStorage : 10;
    }
  });

  const handleChange = (event) => {
    setSize(event.target.value);
    parentCallback(event.target.value);
    window.localStorage.setItem("size", event.target.value);
  };

  return (
    <>
      <div className="">
        <form className="m-auto md:flex lg:w-4/5 md:items-center md:place-content-center lg:place-content-end mb-6">
          <label
            htmlFor="demo-controlled-open-select"
            className="block mb-2  text-sm font-medium text-gray-900 dark:text-white"
          >
            Change size
          </label>

          <select
            id="demo-controlled-open-select"
            value={size}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 md:mb-0 md:ml-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-32 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value={5}>5</option>
            <option value={10}>default</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
            <option value={25}>25</option>
            <option value={30}>30</option>
            <option value={35}>35</option>
            <option value={40}>40</option>
            <option value={45}>45</option>
            <option value={50}>50</option>
          </select>
        </form>
      </div>
    </>
  );
}
