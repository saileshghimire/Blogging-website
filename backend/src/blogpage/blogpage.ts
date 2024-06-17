import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from "hono/jwt";


const Blog = new Hono<{
    Bindings:{
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>()

Blog.use('/*', async (c, next) => {
    const header = c.req.header("authorization") || "";
    const token = header.split(" ")[1];
    console.log(token);
    
    const response = await verify(token, c.env.JWT_SECRET);
    console.log(response);
    console.log(response.id);
    
    if(response.id){
        next()
    }
    else{}
        c.status(403);
        return c.json({
            error:"unauthorized"
        });
})

Blog.post('/', (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    return c.text("blogpost page")
})

Blog.put('/', (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    return c.text("Blog editing page")
})

Blog.get('/bulk', (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    return c.text('bulk post page')
})

Blog.get('/:id', (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const id = c.req.param('id')
    return c.text(`getting blog of id ${id}`)
})


export default Blog;