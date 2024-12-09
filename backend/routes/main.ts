import { Hono } from "hono";
import blog from "./blog";
import user from "./user";
import { cors } from "hono/cors";
const main = new Hono();
main.use('/*',cors()) 
main.route('/user',user)
main.route('/blog',blog)


export default main ;