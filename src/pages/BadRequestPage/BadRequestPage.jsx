import { useNavigate } from "react-router-dom";

export default function BadRequestPage(props) {
  const navigate = useNavigate();
  history.pushState("", "Bad request page", "/bad-request");
  return (
    <>
      <div className="z-20 grid place-content-center absolute top-0 right-0 w-full h-screen bg-black/80">
        <div className="grid gap-4 w-64 h-60 rounded-lg p-2 place-content-center border-solid border-2 border-white">
          <p>
            Please enter a correct pattern in the url for your query. <br />{" "}
            Some data is shown by default{" "}
          </p>
          <button
            className="w-16 h-16 m-auto"
            onClick={() => navigate("/flights")}
          >
            ✕
          </button>
        </div>
      </div>
    </>
  );
}
