import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupType } from "sway-medium-common-02";
import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export let name :any;
export const Auth = ({ type }: { type: "signin" | "signup" }) => {
  const [postInput, setInput] = useState<SignupType>({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate()
  async function sendData(){
    const endpoint = type =="signup" ?'/api/v1/user/signup' : 'api/v1/user/signin'
  try {
    const res = await axios.post(`${backendUrl}/${endpoint}`, { 
      email: postInput.email, name: postInput.name, password: postInput.password 
    },
  );
    if (res.status === 200) {
      const jwt = res.data.token;
      console.log('res.data from auth comp: ',res.data)
      //alert(`JWT Token: ${jwt}`);
      localStorage.setItem('token', jwt);
       name = res.data.user.name
       console.log('name from auth : ',name , 'res.data.user.name: ' , res.data.user.name)
      navigate('/blog/bulk'); // No need for BackendUrl in navigate
    } else {
      alert(`Error: ${res.data.error}`);
    }
  } catch (e:any) {
    console.error(`Error occurred: ${e.response?.data || e.message}`);
    alert(`Error: ${e.response?.data?.error || "Unexpected error occurred"}`);
  }
}
  return (
    <div className="flex flex-col justify-center h-screen text-center py-3">
      <div className=" justify-center">
        <div className="text-5xl font-bold">
          {" "}
          {type == "signup" ? "Create an Account" : "Log into Account"}{" "}
        </div>
        <div className="pt-2 font-light">
          {type == 'signup' ? 'Already have an account ? ' : "Don't have an account ? "}
          <Link
            to={type == "signup" ? "/signin" : "/signup"}
            className=" underline"
          >
            {type == "signup" ? "Login" : "Signup"}
          </Link>
        </div>
        <div className=" flex flex-col justify-center items-center pb-3">
          <div className="w-1/2 ">
            {type == "signup" ? (
              <LabelledInput
                label="Username"
                placeholder="Swayam D"
                onChange={(e) => {
                  setInput({ ...postInput, name: e.target.value });
                }}
              />
            ) : null}
            <LabelledInput
              label="Email"
              placeholder="sway@gmail.com"
              onChange={(e) => {
                setInput({ ...postInput, email: e.target.value });
              }}
            />
            <LabelledInput
              label="Password"
              placeholder="caco32e"
              type="password"
              onChange={(e) => {
                setInput({ ...postInput, password: e.target.value });
              }}
            />
            <div className="pt-4">
              <button
                type="button"
                onClick={sendData}
                className=" w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-lg px-5 py-2.5 me-2 mb-2"
              >
                {type == "signup" ? "Signup" : "Login"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
interface labelledInput {
  label: string;
  placeholder: string;
  type?: string;
  onChange(e: any): void;
}
function LabelledInput({ label, placeholder, onChange, type }: labelledInput) {
  return (
    <div className="mb-6 pt-3">
      <label className="flex justify-start mb-2 text-xl font-medium text-gray-900 ">
        {label}
      </label>
      <input
        placeholder={placeholder}
        onChange={onChange}
        type={type || "text"}
        id="large-input"
        className=" py-3 block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 "
      />
    </div>
  );
}
