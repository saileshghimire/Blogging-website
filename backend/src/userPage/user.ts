import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'

const user = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>()

user.post('/signup', async (c) => {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());
    
        const body = await  c.req.json();
        try{
        const newuser = await prisma.user.create({
            data:{
                email:body.email,
                password: body.password
        
            }
        });
        
        const token = await sign({ id: newuser.id }, c.env.JWT_SECRET);
        return c.json({
            token:token
        });

    } catch(error){
        console.error('Error during signup:', error); // Detailed log for development
        c.status(403);
        return c.json({ error: 'Internal server error' }, 500);
    }

})

user.post('/signin', async (c) => {
        const prisma = new PrismaClient({
            datasourceUrl: c.env?.DATABASE_URL	,
        }).$extends(withAccelerate());

        const body = await c.req.json();
        try{
        const user = await prisma.user.findUnique({
            where:{
                email: body.email
            }
        });

        if(!user){
            c.status(403);
            return c.json({
                error:"Incorrect Email or password"
            });
        }

        const payload = {
            sub: user.id   
          };
        
        
        const token = await sign(payload, c.env.JWT_SECRET);
	    return c.json({
            token: token
        });


    } catch(error){
        console.error('Error during sign:', error); // Detailed log for development
        return c.json({ error: 'Internal server error' }, 500); 
    }
})

export default user;