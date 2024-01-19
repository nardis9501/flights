import { useState, useEffect } from "react";

export default function PaginationButton({
  resources,
  currentPage,
  setCurrentPage,
  totalPage,
}) {
  const [disabled, setDisabled] = useState(currentPage <= 1 ? true : false);
  const [disabledButtoPlus, setDisabledButtoPlus] = useState(false);
  console.log(currentPage);
  useEffect(() => {
    if (currentPage >= totalPage) {
      setDisabledButtoPlus(true);
    } else {
      setDisabledButtoPlus(false);
    }

    if (resources && resources.length === 0) {
      setCurrentPage(totalPage);
    }
  }, [totalPage]);
  const handlerClick = (e) => {
    if (e.target.value === "-") {
      if (currentPage <= totalPage) {
        setDisabledButtoPlus(false);
      }
      setCurrentPage(currentPage - 1);

      if (currentPage < 3) {
        setDisabled(true);
      }
      return setCurrentPage(currentPage - 1);
    }

    setDisabled(false);
    setCurrentPage(currentPage + 1);
    if (currentPage >= totalPage - 1) {
      return setDisabledButtoPlus(true);
    }
  };
  return (
    <>
      <input
        onClick={handlerClick}
        disabled={disabled}
        type="button"
        value={"-"}
        className={`${
          disabled && "opacity-55"
        } text-black place-content-center bg-white  m-2 rounded-md w-10 h-10`}
      />
      {currentPage}/{totalPage}
      <input
        onClick={handlerClick}
        disabled={disabledButtoPlus}
        type="button"
        value={"+"}
        className={`${
          disabledButtoPlus && "opacity-55"
        } text-black place-content-center bg-white  m-2 rounded-md w-10 h-10`}
      />
    </>
  );
}
