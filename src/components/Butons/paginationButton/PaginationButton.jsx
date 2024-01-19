import { useState, useEffect } from "react";

export default function PaginationButton({
  resources,
  currentPage,
  setCurrentPage,
}) {
  const [disabled, setDisabled] = useState(currentPage <= 1 ? true : false);
  const [disabledButtoPlus, setDisabledButtoPlus] = useState(false);
  console.log(currentPage);
  useEffect(() => {
    if (resources && resources.length === 0) {
      return setDisabledButtoPlus(true);
    }
    setDisabledButtoPlus(false);
  }, [resources]);
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
  return (
    <>
      <input
        onClick={handlerClick}
        disabled={disabledButtoPlus}
        type="button"
        value={"+"}
        className={`${
          disabledButtoPlus ? "opacity-55" : ""
        } text-black place-content-center bg-white  m-2 rounded-md w-10 h-10`}
      />
      <input
        onClick={handlerClick}
        disabled={disabled}
        type="button"
        value={"-"}
        className={`${
          disabled ? "opacity-55" : ""
        } text-black place-content-center bg-white  m-2 rounded-md w-10 h-10`}
      />
    </>
  );
}
