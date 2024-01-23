import { ImCross } from "react-icons/im";
import { useEffect, useState } from "react";

export default function Modal({ isModal, parentCallback }) {
  const [code, setCode] = useState();
  const [codeError, setCodeError] = useState(false);
  const [availableCode, setAvailableCode] = useState(true);
  const [capacity, setCapacity] = useState();
  const [departureDate, setDepartureDate] = useState();
  const handleSubmit = (event) => {
    console.log(event);
    event.preventDefault();
    const values = {
      code: "",
      capacity: "",
      departureDate: "",
    };
    values.code = code;
    values.capacity = capacity;
    values.departureDate = departureDate;

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };
    fetch("http://localhost:3000/flights", requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result));

    console.log(values);
  };

  const handleCodeChange = (event) => {
    const newCode = event.target.value.trim();

    const length = newCode.length;
    const pattern = new RegExp("^[A-Z]+$", "i");
    if (!pattern.test(newCode)) {
      setCodeError(true);
    } else if (length === 6) {
      console.log("se cumple 1");
      setCodeError(false);
    } else if (length === 7 && code.length === 6) {
      setCodeError(false);
    } else {
      setCodeError(true);
    }
    if (length <= 6) {
      setCode(newCode);
    }
    console.log(code);
  };

  const handleSelectChange = (event) => {
    setCapacity(Number(event.target.value));
  };
  const handleDepartureDateChange = (event) => {
    setDepartureDate(event.target.value);
  };

  const createArray = (N) => {
    let newArr = [];
    for (let i = 1; i <= N; i++) {
      newArr.push(i);
    }
    return newArr;
  };
  useEffect(() => {
    if (code && codeError === false) {
      console.log(code);
      fetch(`http://localhost:3000/flights/available?code=${code}`)
        .then((response) => {
          if (!response.ok)
            throw new Error(
              "An error occurred while loading flights code from the API"
            );
          return response.json();
        })
        .then((data) => {
          if (data.status === "unavailable") {
            return setAvailableCode(false);
          }
          setAvailableCode(true);
        });
    }
    setAvailableCode(true);
  }, [code]);
  return (
    <>
      {isModal && (
        <div className="absolute text-slate-700 dark:text-slate-300 top-0 right-0 z-10 flex justify-center items-center bg-slate-400/80 dark:bg-black/80 h-screen w-full">
          <div className="flex flex-col bg-white items-center border-2 border-solid p-2   dark:bg-slate-600/85 md:shadow-md md:bg-white/85 md:w-[480px]  md:h-3/4 rounded-md  ">
            <div className="flex justify-end w-full p-2 ">
              <ImCross
                className="cursor-pointer text-secondary"
                onClick={() => parentCallback()}
              />
            </div>
            <h2 className="text-secondary">Add Fligths</h2>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col py-10 h-full gap-4 items-center justify-between"
              action=""
            >
              <div className="relative w-full col-span-2">
                <label for="code " className="">
                  Code:
                </label>
                <input
                  onChange={handleCodeChange}
                  id="code"
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="AbcDeFG"
                  value={code}
                  required
                />
                {codeError && (
                  <p className="max-w-64 text-secondary">
                    The code must be unique, of 6 upper or lower case
                    characters.
                  </p>
                )}
                {!availableCode && (
                  <p className=" text-secondary">Code unavailable</p>
                )}
              </div>

              <div className="relative w-full col-span-2">
                <label htmlFor="demo-controlled-open-select">Capacity:</label>
                <select
                  onChange={handleSelectChange}
                  id="demo-controlled-open-select"
                  className="cursor-pointer bg-gray-50 border border-gray-300 text-gray-900   text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                >
                  {createArray(200).map((index) => (
                    <option key={index} value={index}>
                      {index}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative w-full col-span-2">
                <label for="departure-date " className="">
                  departure date:
                </label>
                <input
                  onChange={handleDepartureDateChange}
                  id="departure-date"
                  type="date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  min={new Date().toJSON().split("T")[0]}
                  required
                />
              </div>

              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-max  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="submit"
                value="Submit"
                disabled={codeError !== false || !availableCode}
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
}
