import { Link } from "react-router-dom";
import { NameAvatar } from "./avatar";


interface blogcard {
  author: string;
  title: string;
  description: string;
  published: string;
  id:any
}
export const Blogcard = ({
  author,
  title,
  description,
  published,
  id
}: blogcard) => {
  return (
  <Link to={`/blog/${id}`}>
      <div>
    <div className=" flex justify-center pt-1 pb-5 cursor-pointer">
      <div className=" border-b-2 w-1/2 pt-2 px-5 pl-3">
        <div className="flex items-center pt-2 ">
        <NameAvatar name={author} w={7} h={7}/>
          <div className="pb-2 px-2 font-medium">.</div>
          <div className="text-xl font-light">{author}</div>
          <div className="pb-2 px-2 font-medium">.</div>
          <div className="font-extralight text-xl">{published}</div>
        </div>
        <div className="py-1 font-bold  text-3xl">{title}</div>
        <div className="py-1 font-light text-xl">
          {`${
            description.length > 200 ? description.slice(0, 200) : description
          }...`}
        </div>
        <div className="py-1 pb-6  text-lg font-thin">
          {`${Math.ceil(description.length / 400)} minutes`}
        </div>
      </div>
    </div>
    </div>
  </Link>
  );
};
interface AvatarProps {
  name: string;
  width?: number; 
  height?: number;
}

export const Avatar = ({ name, width = 9, height =9}: AvatarProps) => {
  return (
    <div
      className={`text-lg rounded-full bg-slate-600 flex justify-center items-center min-w-${width} min-h-${height}`}
    >
      {name.charAt(0)}
    </div>
  );
};

