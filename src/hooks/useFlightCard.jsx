import { useEffect } from "react";

export default function useFlightCard(flightId) {
  useEffect(() => {
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
        // setUrlObject(URL.createObjectURL(data));
        document.getElementById(flightId).src = URL.createObjectURL(data);
        console.log(data);
      })
      .catch((err) => {
        //setError(err);
        console.log(err);
      });
  }, [flightId]);
}
