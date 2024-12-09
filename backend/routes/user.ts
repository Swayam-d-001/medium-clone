import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { signinInput, signupInput } from "sway-medium-common-02";
const user = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

user.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const {success} = signupInput.safeParse(body)
  if(!success){
    return c.json({error : "wrong inputs"})
  }
  let user;
  try {
    user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name,
      },
    });
    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({
      token: token,
      user: user,
    });
  } catch (err) {
    c.status(403);
    return c.json({
      error: err,
    });
  }
});
user.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  let body;
  try {
    body = await c.req.json();
    console.log(body)
    const {success} = signinInput.safeParse(body)
    if(!success){
      return c.json({error : "wrong inputs"})
    }
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
        password: body.password,
      },
    });
    console.log(user)
    if (!user) {
      return c.text("user doesn't exist ");
    }
    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    console.log(token)
    return c.json({ user: user, token: token });
  } catch (e) {
    return c.json({ 
     error : e,
     err:"error occured during signin"
     });
  }
});
export default user;
