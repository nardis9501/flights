import { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import PaginationButton from "../../components/Butons/paginationButton/PaginationButton";
export default function FlightsPage(props) {
  const [loading, setLoading] = useState(false);
  const [flights, setFlights] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [disabled, setDisabled] = useState(currentPage <= 1 ? true : false);
  const [disabledButtoPlus, setDisabledButtoPlus] = useState(false);
  const [size, setSize] = useState(() => {
    const getSizeFromStorage = window.localStorage.getItem("size");
    {
      return getSizeFromStorage ? getSizeFromStorage : 10;
    }
  });

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

  const handlerClick = (e) => {
    if (e.target.value === "-") {
      //   setDisabledButtoPlus(false);

      if (currentPage >= 3) {
        setCurrentPage(currentPage - 1);
      } else {
        setCurrentPage(currentPage - 1);
        setDisabled(true);
      }
      return setCurrentPage(currentPage - 1);
    }
    setDisabled(false);

    return setCurrentPage(currentPage + 1);
  };

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
          />
        </div>
        <div className="fixed bottom-14 lg:bottom-3 right-0 left-0">
          <PaginationButton
            resources={resources}
            currentPage={currentPage}
            setCurrentPage={handleSetCurrentPage}
          />
        </div>
      </div>
    </>
  );
}
