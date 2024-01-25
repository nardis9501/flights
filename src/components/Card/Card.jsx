import { useEffect, useState } from "react";
import { TbPhotoSearch } from "react-icons/tb";

export default function Card({ resources }) {
  const [id, setId] = useState("");
  const [preview, setPreview] = useState(true);
  const [urlObject, setUrlObject] = useState("");
  useEffect(() => {
    //setPreview(true);
    console.log(id);
    fetch(`http://localhost:3000/flights/${id}/photo
    `)
      .then((response) => {
        if (!response.ok)
          throw new Error(
            "An error occurred while loading flights from the API"
          );
        return response.blob();
      })
      .then((data) => {
        // setUrlObject(URL.createObjectURL(data));
        document.getElementById(id).src = URL.createObjectURL(data);
        console.log(data);
      })
      .catch((err) => {
        //setError(err);
        console.log(err);
      });
  }, [id]);

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
                {(id === urlObject && (
                  <img
                    id={id}
                    className={`${
                      id !== urlObject && "hidden"
                    } h-48 w-full object-cover md:h-full md:w-48`}
                    src=""
                    alt={`Image of the flight corresponding to code: ${code}`}
                  />
                )) ||
                  (img && status === "ready" && (
                    <TbPhotoSearch
                      size={40}
                      onClick={() => {
                        setId(id);
                        setPreview(false);
                        setUrlObject(id);
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
