import { useEffect, useState } from "react";
import { TbPhotoSearch } from "react-icons/tb";
import useFlightCard from "../../hooks/useFlightCard";
import { TiDelete } from "react-icons/ti";

export default function Card({ resources }) {
  const [flightId, setFlightId] = useState(null);
  const [deleteByFlightID, setDeleteByFlightID] = useState(null);

  const { flights, urlObject } = useFlightCard(
    flightId,
    deleteByFlightID,
    resources
  );

  return (
    <>
      {flights &&
        flights.map(({ code, departureDate, capacity, img, id, status }) => (
          <div
            key={id}
            className="lg:hidden relative w-4/5 md:max-w-2xl mb-4  mx-auto bg-white/85 dark:bg-black/40 hover:opacity-65 rounded-xl shadow-md overflow-hidden "
          >
            <TiDelete
              onClick={() => setDeleteByFlightID(id)}
              className="absolute right-0 p-1 hover:text-secondary"
              size={30}
            />
            <div className="md:flex">
              <div className="md:shrink-0 md:flex  md:items-center  md:w-1/3">
                {(id === flightId && (
                  <img
                    id={id}
                    className={`h-48 w-full object-cover md:h-full md:w-48`}
                    src={urlObject}
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

      <table className="hidden lg:table w-full md:w-4/5 m-auto dark:text-slate-300 text-slate-900">
        <tbody>
          <tr className="h-10 bg-white  dark:bg-slate-500 text-secondary">
            <th>Code</th>
            <th>Capacity</th>
            <th>Departure Date</th>
            <th>Img</th>
          </tr>
          {flights &&
            flights.map(
              ({ id, code, capacity, departureDate, img, status }) => (
                <tr
                  key={id}
                  className="relative h-10 hover:opacity-50 odd:bg-white dark:odd:bg-slate-900 even:bg-slate-400 dark:even:bg-slate-700"
                >
                  <td>{code}</td>
                  <td>{capacity}</td>
                  <td>{departureDate}</td>
                  <td>
                    <TiDelete
                      onClick={() => setDeleteByFlightID(id)}
                      className="absolute right-0 top-0 p-1 hover:text-secondary"
                      size={30}
                    />
                    <div className="grid place-content-center">
                      {(id === flightId && (
                        <img
                          id={id}
                          className={`${
                            id !== flightId && "hidden"
                          } object-cover `}
                          src={urlObject}
                          width={340}
                          height={340}
                          alt={`Image of the flight corresponding to code: ${code}`}
                        />
                      )) ||
                        (img && status === "ready" && (
                          <TbPhotoSearch
                            size={40}
                            onClick={() => {
                              setFlightId(id);
                            }}
                            className="m-auto"
                          />
                        ))}
                    </div>
                  </td>
                </tr>
              )
            )}
        </tbody>
      </table>
    </>
  );
}
