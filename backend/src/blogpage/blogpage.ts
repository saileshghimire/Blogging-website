import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from "hono/jwt";


const Blog = new Hono<{
    Bindings:{
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables : {
		userId: number;
	}
}>()

Blog.use('/*', async (c, next) => {
    const header = c.req.header("authorization") || "";
    const token = header.split(" ")[1];
   
    const user = await verify(token, c.env.JWT_SECRET);
    console.log(user);
    
    console.log(user.id);
    console.log(typeof user.id);
    if(user){
        const userId = user.id as number;
        c.set("userId",userId);
        // c.set("userId",user.id);
        next();
    }
    else{
        c.status(403);
        return c.json({
            error:"unauthorized"
        });

    }
})

Blog.post('/', async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    try{
        const post = await prisma.post.create({
            data:{
                title: body.title,
                content: body.content,
                authorId: c.get('userId')
            }
        });
        c.status(200);
        return c.json({
            post
        });

    } catch(error){
        console.log(error);
        return c.json({
            error:'Sorry unable to post'
        }); 
    }
    
})

Blog.put('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const userId = c.get('userId');
    const body = await c.req.json();

    try{
        await prisma.post.update({
            where:{
                id: body.id,
                authorId: userId
            },
            data:{
                title: body.title,
                content:body.content
            }
        });
        return c.json({
            message:"post updated"
        });

    } catch(error){
        console.log(error);
        return c.json("somethings went wrong !!")       
    }
})

Blog.get('/bulk', (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const userId = c.get('userId');

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