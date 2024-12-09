import { Link } from "react-router-dom";
import { NameAvatar } from "./avatar";
interface appbar{
  name? : any,
  buttonName? : any 
}

export const Appbar = ({ name,buttonName }:appbar) => {
  return (
    <div>
      <div className="flex justify-between items-center px-10 py-5 border-b-2">
        <div className="text-xl">Medium</div>
        <div className=" flex justify-center items-center">
          <Link to="/blog/post">
            {buttonName ? (
              <button
                type="button"
                className="w-full text-black bg-green-600 hover:bg-green-400 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-lg px-3 py-2.5 me-4 mb-2"
              >
                {buttonName}
              </button>
            ) : null}
          </Link>
          <div className="pb-2 pl-4">
            <NameAvatar name={name ||"Anonynmous"} />
          </div>
        </div>
      </div>
    </div>
  );
};
