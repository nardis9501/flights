import { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import PaginationButton from "../../components/Butons/paginationButton/PaginationButton";
import { useParams } from "react-router-dom";
export default function FlightsPage(props) {
  const [loading, setLoading] = useState(false);
  const [flights, setFlights] = useState([]);
  const [currentPage, setCurrentPage] = useState(() => {
    const getCurrentPageFromStorage =
      window.localStorage.getItem("currentPage");
    {
      return getCurrentPageFromStorage ? getCurrentPageFromStorage : 1;
    }
  });
  const [totalPage, setTotalPage] = useState(1);
  const [size, setSize] = useState(() => {
    const getSizeFromStorage = window.localStorage.getItem("size");
    {
      return getSizeFromStorage ? getSizeFromStorage : 10;
    }
  });

  history.pushState(
    { page: currentPage },
    `title ${currentPage}`,
    `?page=${currentPage}&size=${size}`
  );
  console.log(history);
  useEffect(() => {
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

  useEffect(() => {
    window.localStorage.setItem("currentPage", currentPage);
  }, [currentPage]);

  //console.log(flights);
  const { resources } = flights;
  console.log(totalPage);

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
    </>
  );
}
