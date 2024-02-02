import { useEffect, useState } from "react";
import Table from "../../components/Card/Table";
import PaginationButton from "../../components/Butons/paginationButton/PaginationButton";
import { useLocation, useNavigate } from "react-router-dom";
import { defaultSize } from "../../components/Size/Size.data";
import Size from "../../components/Size/Size";
import { HiMiniPlus } from "react-icons/hi2";
import Modal from "../../components/Modal/Modal";
import Card from "../../components/Card/Card";
import { LuSearchCode } from "react-icons/lu";

export default function FlightsPage(props) {
  const [loading, setLoading] = useState(false);
  const [flights, setFlights] = useState([]);
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [urlIsError, setUrlIsError] = useState(false);
  const [findCode, setFindCode] = useState(null);
  const [noData, setNoData] = useState(false);
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
        setData(data);
        setFlights(data.resources);
        if (data.total === 0) {
          setNoData(true);
          return setTotalPage(1);
        }
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

  const { resources, total } = data;
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

  const filterByCode = () => {
    console.log(findCode);
    const flightByCode = resources.filter(({ code }) => code === findCode);
    console.log(flightByCode);
    setFlights(flightByCode);
  };
  const handleChange = (e) => {
    const newCode = e.target.value.trim();
    console.log(newCode === "");

    const length = newCode.length;
    const pattern = new RegExp("^[A-Z]+$", "i");
    if (length <= 6) {
      setFindCode(newCode);
    }
    if (newCode === "") {
      setFlights(resources);
    }
  };
  return (
    <>
      <h2 className="py-2 dark:text-slate-400 text-white text-2xl">
        Flights page
      </h2>
      <div className="h-3/4 w-full ">
        <div className="flex flex-col md:items-center lg:pb-20">
          <div className="flex flex-row w-full md:w-4/5 items-center place-content-between mb-6">
            <div className="flex items-center">
              <input
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900  md:ml-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-32 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="search"
                name="search-by-code"
                id="search-by-code"
                value={findCode}
              />
              <LuSearchCode
                className="cursor-pointer"
                onClick={() => filterByCode()}
                size={30}
              />
            </div>
            <div className="flex">
              <Size parentCallback={handleCallback} size={size} />
              <div
                onClick={() => setModal(true)}
                className="cursor-pointer md:ml-4 text-secondary"
              >
                {<HiMiniPlus size={35} />}
              </div>
            </div>
          </div>
          {noData && (
            <h2>no flight data available at the moment, try to create one</h2>
          )}
          <Card resources={flights} />
          {/* <Table resources={resources} isLoading={loading} size={size} /> */}
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
      <Modal isModal={modal} parentCallback={() => setModal(false)} />
    </>
  );
}
