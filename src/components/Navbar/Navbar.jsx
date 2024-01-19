import { motion } from "framer-motion";
import { fadeIn } from "../../utils/motionTransitions";
import { Link, useResolvedPath } from "react-router-dom";
import { dataNavbar } from "./Navbar.data";
export default function Navbar(props) {
  const pathName = useResolvedPath().pathname;

  return (
    <>
      <motion.div
        className="fixed bottom-0 right-0 w-full z-10 flex flex-col items-center md:justify-center h-max md:top-1/4 md:right-10 md:w-16 md:h-screen mt-auto"
        variants={fadeIn("right", 0.5)}
        initial="hidden"
        animate="show"
        exit={"hidden"}
      >
        <div className="flex items-center justify-between w-full px-4 py-3 md:py-8 md:flex-col md:justify-center gap-y-10 md:px-4 md:h-max backdrop-blur-sm md:rounded-full bg-white/10">
          {dataNavbar.map((data) => (
            <div key={data.name}>
              <Link
                to={data.path}
                className={`${
                  data.path === pathName && "text-secondary"
                } group transition-all duration-300`}
              >
                <div className="absolute hidden right-0 mr-20 md:group-hover:flex md:group-hover:items-center">
                  <div className="relative flex items-center p-2 leading-none capitalize text-black bg-white rounded-sm">
                    {data.name}
                  </div>
                  <div className="absolute border-l-8 border-r-0 border-solid border-l-white border-y-transparent border-y-4 -right-2" />
                </div>
                {data.icon}
              </Link>
            </div>
          ))}
        </div>
      </motion.div>
    </>
  );
}
