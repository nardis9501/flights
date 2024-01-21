import { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import PaginationButton from "../../components/Butons/paginationButton/PaginationButton";
import { useLocation, useNavigate } from "react-router-dom";
import { defaultSize } from "../../components/Size/Size.data";
import Size from "../../components/Size/Size";
export default function FlightsPage(props) {
  const [loading, setLoading] = useState(false);
  const [flights, setFlights] = useState([]);
  const [urlIsError, setUrlIsError] = useState(false);
  const [totalPage, setTotalPage] = useState(() => {
    const getTotalPageFromStorage = window.localStorage.getItem(
      "persistanceLocalStorageTotalPage"
    );
    {
      return getTotalPageFromStorage ? Number(getTotalPageFromStorage) : 1;
    }
  });
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
  const location = useLocation();
  const { pathname, search } = location;
  const navigate = useNavigate();

  useEffect(() => {
    window.localStorage.setItem("currentPage", currentPage);
  }, [currentPage]);
  useEffect(() => {
    window.localStorage.setItem("size", size);
  }, [size]);
  useEffect(() => {
    window.localStorage.setItem("persistanceLocalStorageTotalPage", totalPage);
  }, [totalPage]);
  useEffect(() => {
    if (pathname === "/flights" && search === "") {
      history.pushState(
        { page: currentPage, size: size },
        "title",
        `?page=${currentPage}&size=${size}`
      );
    } else if (search.includes("?page=") && search.includes("&size=")) {
      const regex = /(\d+)/g;
      const queries = search.match(regex);

      if (
        queries === null ||
        queries.length != 2 ||
        queries[1] == 0 ||
        queries[0] == 0
      ) {
        return navigate("/bad-request");
      }
      setCurrentPage(Number(queries[0]));
      setSize(Number(queries[1]));
    } else {
      return navigate("/bad-request");
    }
  }, []);
  useEffect(() => {
    setLoading(true);
    history.pushState(
      { page: currentPage, size: size },
      "title",
      `?page=${currentPage}&size=${size}`
    );

    fetch(` http://localhost:3000/flights?page=${currentPage}&size=${size}`)
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
        //setError(err);
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentPage, size]);

  const { resources, total } = flights;
  useEffect(() => {
    if (currentPage > totalPage) {
      history.pushState(
        { page: 1, size: defaultSize },
        "title",
        `?page=${1}&size=${defaultSize}`
      );
      setCurrentPage(1);
      setSize(defaultSize);
      setUrlIsError(true);
    }
  }, [currentPage]);

  if (urlIsError) {
    return navigate("/bad-request");
  }

  const handleCallback = (newSize) => {
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
          <Size parentCallback={handleCallback} size={size} />
          <Card resources={resources} isLoading={loading} size={size} />
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
    </>
  );
}
