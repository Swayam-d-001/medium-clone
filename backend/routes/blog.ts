import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "sway-medium-common-02";
const blog = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: any;
  };
}>();
blog.use("/*", async (c, next) => {
  try {
    const authHeader = c.req.header("Authorization") || "";
    let token;
    // console.log(authHeader)
    if (authHeader.startsWith("Bearer ")) {
      token = authHeader.slice(7);
       console.log(`token in header : ${token}`)
      const user = await verify(token, c.env.JWT_SECRET);
      const userId = user.id;
      if (user) {
        c.set("userId", String(userId));

        console.log("authenticated");
        
        await next();
      }
    } else {
      return c.text(`token is invalid ${token}`);
    }
  } catch (e) {
    return c.json({ e: e });
  }
});
blog.post("/post", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const body = await c.req.json();
    const {success} = createBlogInput.safeParse(body)
    if(!success){
      return c.json({error:"wrong title or description"})
    }
    const userId = c.get("userId");
    console.log(`userID : ${userId}`);
    const blog = await prisma.blog.create({
      data: {
        title: body.title,
        description: body.description,
        authorId: userId,
      },
    });
    return c.json({
      blog: blog,
    });
  } catch (e) {
    return c.json({ error: e });
  }
});
blog.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const blogs = await prisma.blog.findMany({
      select:{
        id:true,
        title:true,
        description:true,
        authorId:true,
        author:{
          select:{
            name:true
          }
      }
      }
    });
    console.log(blogs)
    return c.json({ blogs : blogs });
  } catch (e) {
    return c.json({ error_occured: e });
  }
});
blog.put("/editblog", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const userId = c.get("userId");
    const body = await c.req.json();
    const {success} = updateBlogInput.safeParse(body)
    if(!success){
      return c.json({error:"wrong title or description"})
    }
    const updateBlog = await prisma.blog.update({
      where: {
        id: body.id,
        authorId: userId,
      },
      data: {
        title: body.title,
        description: body.description,
      },
    });
    return c.json({ updatedBlog: updateBlog });
  } catch (e) {
    return c.json({ error: e });
  }
});
blog.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const id = c.req.param("id");
    const blog = await prisma.blog.findFirst({
      where: {
        id: id,
      },
      select:{
        id:true,
        title:true,
        description:true,
        authorId:true,
        author:{
          select:{
            name:true
          }
      }
      }
    });
    return c.json({
      blog: blog,
    });
  } catch (e) {
    return c.json({ error: e });
  }
});

export default blog;
