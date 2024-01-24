import { useEffect, useState } from "react";
import PaginationButton from "../Butons/paginationButton/PaginationButton";
import Size from "../Size/Size";
import { TbPhotoSearch } from "react-icons/tb";
import { ImCross } from "react-icons/im";

export default function Card({ resources, parentCallback, isLoading, size }) {
  const [id, setId] = useState("");
  const [urlObject, setUrlObject] = useState("");
  const [preview, setPreview] = useState(false);
  useEffect(() => {
    setPreview(true);
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
        setUrlObject(URL.createObjectURL(data));
      })
      .catch((err) => {
        //setError(err);
        console.log(err);
      });
  }, [id]);
  console.log(urlObject);
  return (
    <>
      <table className=" lg:table w-full md:w-4/5 m-auto dark:text-slate-300 text-slate-900">
        <tbody>
          <tr className="h-10 bg-white  dark:bg-slate-500 text-secondary">
            <th>Code</th>
            <th>Capacity</th>
            <th>Departure Date</th>
            <th>Img</th>
          </tr>
          {resources &&
            resources.map(
              ({ id, code, capacity, departureDate, img, status }) => (
                <tr
                  key={id}
                  className="h-10 odd:bg-white dark:odd:bg-slate-900 even:bg-slate-400 dark:even:bg-slate-700"
                >
                  <td>{code}</td>
                  <td>{capacity}</td>
                  <td>{departureDate}</td>
                  <td>
                    {img && status === "ready" && (
                      <div>
                        <TbPhotoSearch
                          size={30}
                          onClick={() => setId(id)}
                          className="m-auto"
                        />
                        {preview && urlObject && (
                          <div className="flex p-1 border border-solid rounded-md bg-black/5 flex-col fixed top-1/3 left-1/3 items-end text-secondary max-h-30 max-w-64">
                            <ImCross onClick={() => setPreview(false)} />
                            <img src={urlObject} alt="" />
                          </div>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              )
            )}
        </tbody>
      </table>
      {isLoading && (
        <p className="grid  place-content-center p-4">Loading...</p>
      )}
    </>
  );
}
