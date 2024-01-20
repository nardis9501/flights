import { useEffect, useState } from "react";
import { sizes } from "./Size.data";

export default function Size({ parentCallback, size }) {
  const handleChange = (event) => {
    parentCallback(Number(event.target.value));
  };
  const [isFound, setIsFound] = useState(true);

  useEffect(() => {
    if (!sizes.find((object) => object.size === size)) {
      return setIsFound(false);
    }
    setIsFound(true);
  }, [size]);

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
            {!isFound && <option value={size}>{size}</option>}
            {sizes.map(({ size, label }) => (
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
