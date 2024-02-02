import { useEffect, useState } from "react";

export default function useFlightCard(flightId, deleteByFlightID, resources) {
  const [flights, setFlights] = useState([]);
  const [urlObject, setUrlObject] = useState(null);

  useEffect(() => {
    setFlights(resources);
  }, [resources]);
  useEffect(() => {
    flightId &&
      fetch(`http://localhost:3000/flights/${flightId}/photo
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
          // document.getElementById(flightId).src = URL.createObjectURL(data);
        })
        .catch((err) => {
          //setError(err);
          console.log(err);
        });
  }, [flightId]);
  useEffect(() => {
    deleteByFlightID &&
      fetch(`http://localhost:3000/flights/${deleteByFlightID}`, {
        method: "DELETE",
        headers: {
          accept: "*/*",
        },
      }).then((response) => {
        if (!response.ok) {
          throw Error("An error occurred while trying to delete the flight");
        }
        const newFlights = resources.filter(
          ({ id }) => id !== deleteByFlightID
        );
        setFlights(newFlights);
      });
  }, [deleteByFlightID]);
  return { flights, urlObject };
}
