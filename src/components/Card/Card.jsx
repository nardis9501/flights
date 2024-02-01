import { useEffect, useState } from "react";
import { TbPhotoSearch } from "react-icons/tb";
import useFlightCard from "../../hooks/useFlightCard";

export default function Card({ resources }) {
  const [flightId, setFlightId] = useState(null);

  useFlightCard(flightId);

  return (
    <>
      {resources &&
        resources.map(({ code, departureDate, capacity, img, id, status }) => (
          <div
            key={id}
            className="lg:hidden mb-4 w-4/5 mx-auto bg-white/85 dark:bg-black/20 rounded-xl shadow-md overflow-hidden md:max-w-2xl"
          >
            <div className="md:flex">
              <div className="md:shrink-0 md:flex  md:items-center  md:w-1/3">
                {(id === flightId && (
                  <img
                    id={id}
                    className={`h-48 w-full object-cover md:h-full md:w-48`}
                    src=""
                    alt={`Image of the flight corresponding to code: ${code}`}
                  />
                )) ||
                  (img && status === "ready" && (
                    <TbPhotoSearch
                      size={40}
                      onClick={() => {
                        setFlightId(id);
                      }}
                      className="m-auto mt-4 md:mt-auto md:ml-4"
                    />
                  ))}
              </div>
              <div className="p-8 md:p-0 md:py-8 md:flex items-center md:justify-end">
                <div className="tracking-wide text-sm font-semibold">
                  <span className="uppercase text-secondary  m-2">code:</span>
                  {code}
                </div>
                <span className="block mt-1 md:mt-0 text-lg leading-tight font-medium text-black dark:text-white">
                  <span className="uppercase text-secondary m-2">
                    capacity:
                  </span>
                  {capacity}
                </span>
                <span className="mt-2 md:mt-0 text-slate-500 dark:text-slate-300">
                  <span className="uppercase text-secondary m-2">date:</span>
                  {departureDate}
                </span>
              </div>
            </div>
          </div>
        ))}
    </>
  );
}
