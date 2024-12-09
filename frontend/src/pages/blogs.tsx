import { Blogcard } from "../components/blogCard";
import { Appbar } from "../components/appBar";
import { useBlogs } from "../hooks/useblogs";

import { name } from "../components/auth";
export const Blogs = () => {
  const { blogs, loading } = useBlogs();
  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }
  console.log('name from /bulk page :',name)
  return (
    <div>
    <Appbar name={name} buttonName={'New'} />
      {blogs?.length > 0 ? (
        blogs.map((blog) => (
          <Blogcard
            key={blog.id}
            author={blog.author.name}
            title={blog.title}
            description={blog.description}
            published="12th of May"
            id={blog.id}
          />
        ))
      ) : (
        <div>No blogs available</div>
      )}
    </div>
  );
};
