import axios from "axios";
import { Appbar } from "../components/appBar";

import { useState } from "react";
import { CreateBlogType } from "sway-medium-common-02";
import { useNavigate } from "react-router-dom";
import { name } from "../components/auth";
const backendUrl = import.meta.env.VITE_BACKEND_URL;
//console.log("Backend URL:", backendUrl);


export const Postblog = () => {
  const [bloginput, setblogInput] = useState<CreateBlogType>({
    title: "",
    description: "",
  });
  const navigate = useNavigate()
  const token = localStorage.getItem("token");
  async function Postblog() {
    try {
      const res = await axios.post(
        `${backendUrl}/api/v1/blog/post`,
        {
          title: bloginput.title,
          description: bloginput.description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if(res.status==200){
        navigate('/blog/bulk')
      }
    } catch (e) {
        console.error('error occured during posting blog : ',e)
        alert("couldn't publish successfully ")
    }
  }
  return (
    <div>
      <div>
        <Appbar name={name}></Appbar>
      </div>
      <div className="flex justify-center pt-7">
        <div className=" flex flex-col justify-center max-w-screen-lg w-1/2 items-center">
          <label className=" mb-2 text-xl font-semibold text-gray-900 flex justify-center ">
            Title
          </label>
          <input
            type="text"
            id="default-input"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            onChange={(e) => {
              setblogInput({ ...bloginput, title: e.target.value });
            }}
          />
          <label className="block mb-2 text-xl font-medium text-gray-900  pt-5">
            Description
          </label>
          <textarea
            id="message"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
            onChange={(e) => {
              setblogInput({ ...bloginput, description: e.target.value });
            }}
            placeholder="Write your thoughts here..."
          ></textarea>
          <button
            type="button"
            className=" mt-4 max-w-screen-xl w-1/4 text-white bg-slate-800 hover:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-lg px-3 py-2.5 me-4 mb-2"
            onClick={Postblog}
          >
            Pubilsh
          </button>
        </div>
      </div>
    </div>
  );
};
