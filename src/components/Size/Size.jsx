import { useEffect, useState } from "react";
import { sizesArray } from "./Size.data";

export default function Size({ parentCallback, size }) {
  const handleChange = (event) => {
    parentCallback(Number(event.target.value));
  };
  const [isFound, setIsFound] = useState(true);

  useEffect(() => {
    if (!sizesArray.find((object) => object.size === size)) {
      return setIsFound(false);
    }
    setIsFound(true);
  }, [size]);

  return (
    <>
      <div className="">
        <form className="m-auto md:flex  md:items-center md:place-content-center">
          <label
            htmlFor="demo-controlled-open-select"
            className="hidden md:block mb-2  text-sm font-medium text-gray-900 dark:text-white"
          >
            Change size
          </label>

          <select
            id="demo-controlled-open-select"
            value={size}
            onChange={handleChange}
            className="cursor-pointer bg-gray-50 border border-gray-300 text-gray-900  md:ml-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-32 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {!isFound && <option value={size}>{size}</option>}
            {sizesArray.map(({ size, label }) => (
              <option key={size} value={size}>
                {label}
              </option>
            ))}
          </select>
        </form>
      </div>
    </>
  );
}
