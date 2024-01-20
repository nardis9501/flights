import { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import PaginationButton from "../../components/Butons/paginationButton/PaginationButton";
import { useLocation, useParams } from "react-router-dom";
export default function FlightsPage(props) {
  const [loading, setLoading] = useState(false);
  const [flights, setFlights] = useState([]);
  const [urlError, setUrlError] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(() => {
    const getCurrentPageFromStorage =
      window.localStorage.getItem("currentPage");
    {
      return getCurrentPageFromStorage ? Number(getCurrentPageFromStorage) : 1;
    }
  });
  const [size, setSize] = useState(() => {
    const getSizeFromStorage = window.localStorage.getItem("size");
    {
      return getSizeFromStorage ? Number(getSizeFromStorage) : 10;
    }
  });
  const Location = useLocation();
  const { pathname, search } = Location;

  useEffect(() => {
    if (pathname === "/flights" && search === "") {
      console.log("es igual");

      history.pushState(
        { page: currentPage, size: size },
        "title",
        `?page=${currentPage}&size=${size}`
      );
    } else if (search.includes("?page=") && search.includes("&size=")) {
      const regex = /(\d+)/g;
      const name = "i_txt_7_14";
      const queries = search.match(regex);

      setCurrentPage(Number(queries[0]));
      setSize(Number(queries[1]));
    } else {
      setUrlError(true);
    }
  }, []);

  // useEffect(() => {
  //   history.pushState(
  //     { page: currentPage, size: size },
  //     "title",
  //     `?page=${currentPage}&size=${size}`
  //   );
  // }, [currentPage, size]);

  useEffect(() => {
    window.localStorage.setItem("currentPage", currentPage);
  }, [currentPage]);
  useEffect(() => {
    window.localStorage.setItem("size", size);
  }, [size]);

  useEffect(() => {
    history.pushState(
      { page: currentPage, size: size },
      "title",
      `?page=${currentPage}&size=${size}`
    );

    setLoading(true);

    fetch(
      ` http://localhost:3000/flights?page=${currentPage}&size=${size}`
      //    &code=${code}
    )
      .then((response) => {
        if (!response.ok)
          throw new Error(
            "An error occurred while loading flights from the API"
          );
        return response.json();
      })
      .then((data) => {
        setFlights(data);
        setTotalPage(Math.ceil(data.total / size));
      })
      .catch((err) => {
        setError(err);
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentPage, size]);

  //console.log(flights);
  const { resources } = flights;
  const handleCallback = (newSize) => {
    console.log(newSize);
    setSize(newSize);
  };

  const handleSetCurrentPage = (currentPage) => {
    setCurrentPage(currentPage);
  };
  return (
    <>
      <h2 className="py-2 dark:text-slate-400 text-white text-2xl">
        Flights page
      </h2>
      <div className=" h-3/4 ">
        <div className="lg:pb-20">
          <Card
            resources={resources}
            parentCallback={handleCallback}
            isLoading={loading}
            size={size}
          />
        </div>
        <div className="fixed bottom-14 lg:bottom-3 right-0 left-0">
          <PaginationButton
            resources={resources}
            currentPage={currentPage}
            setCurrentPage={handleSetCurrentPage}
            totalPage={totalPage}
          />
        </div>
      </div>

      {urlError && (
        <div className="z-20 grid place-content-center absolute top-0 right-0 w-full h-screen bg-black/80">
          <div className="grid gap-4 w-64 h-60 rounded-lg p-2 place-content-center border-solid border-2 border-white">
            <p>
              Please enter a correct pattern in the url for your query. <br />{" "}
              Some data is shown by default{" "}
            </p>
            <button
              className="w-16 h-16 m-auto"
              onClick={() => setUrlError(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
