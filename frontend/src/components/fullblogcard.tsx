interface card {
  title: string | undefined;
  author: string | undefined;
  description: string | undefined;
}
export const FullblogCard = ({ title, description, author }: card) => {
  return (
    <div className="pt-16 px-28">
      <div className="grid grid-cols-12">
        <div className="grid col-span-8 pl-5">
          <div className="text-5xl font-bold">{title}</div>
          <div className="text-xl font-normal pl-2">{description}</div>
        </div>
        <div className="col-span-4 max-w-md">
          <div className=" text-xl font-normal">Author</div>
          <div className="text-3xl font-semibold">{author}</div>
          <div className="font-light pt-4 "> One of the greatest footballer to exist till date , some even call him the 'strongest in heavens'</div>
        </div>
      </div>
    </div>
  );
};
