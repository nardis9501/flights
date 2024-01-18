import PaginationButton from "../Butons/paginationButton/PaginationButton";
import Size from "../Size/Size";

export default function Card({ resources, parentCallback, isLoading }) {
  const handleCallback = (newSize) => {
    parentCallback(newSize);
  };
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <div className="w-full">
        <Size parentCallback={handleCallback} />
        <table className="hidden lg:table w-4/5  m-auto dark:text-slate-300 text-slate-900">
          <tbody>
            <tr className="h-10 bg-white  dark:bg-slate-500 text-amber-500">
              <th>Code</th>
              <th>Capacity</th>
              <th>Departure Date</th>
            </tr>
            {resources &&
              resources.map(({ id, code, capacity, departureDate }) => (
                <tr
                  key={id}
                  className="h-10 odd:bg-white dark:odd:bg-slate-900 even:bg-slate-400 dark:even:bg-slate-700"
                >
                  <td>{code}</td>
                  <td>{capacity}</td>
                  <td>{departureDate}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
