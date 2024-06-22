import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@sailesh059/medium-common";


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
    // const token = header.split(" ")[1];
    const token = header
   
    const user = await verify(token, c.env.JWT_SECRET);
    console.log(user);
    
    console.log(user.id);
    console.log(typeof user.id);
    if(user){
        const userId = user.id as number;
        c.set("userId",userId);
        // c.set("userId",user.id);
        await next();
    }
    else{
        c.status(403);
        return c.json({
            error:"unauthorized"
        });

    }
})

Blog.post('/', async (c)=>{
    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);
        if(!success){
            c.status(411);
            return c.json({
                message :"Inputs are not correct"
            })
        }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

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
    const { success } = updateBlogInput.safeParse(body);
        if(!success){
            c.status(411);
            return c.json({
                message :"Inputs are not correct"
            })
        }

    try{
        const updatedpost = await prisma.post.update({
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
            message:"post updated",
            updatedpost
        });

    } catch(error){
        console.log(error);
        return c.json("somethings went wrong !!")       
    }
})

// Blog.get('/bulk', (c) =>{
//     return c.text("bilk called")
// } )

Blog.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    
    
    try{
        const posts = await prisma.post.findMany({
            select:{
                id: true,
                title: true,
                content: true,
                author:{
                    select:{
                        name:true
                    }
                }
            }
        });
        console.log("bulk is called");
        if (posts.length === 0) {
            return c.json({ message: "No posts available" });
        }

        return c.json({posts});

    } catch(error){
        console.log(`Error at blog/bulk ${error}`);
        return c.json("No post Available")
        
    }
})

Blog.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const id = parseInt(c.req.param('id'));
    const posts = await prisma.post.findFirst({
		where: {
			id
		},
        select:{
            id:true,
            title:true,
            content: true,
            author:{
                select:{
                    name: true
                }
            }
        }
	});

    return c.json({
        posts
    });
})


export default Blog;