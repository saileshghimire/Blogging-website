import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'

const user = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>()

user.post('/signup', async (c) => {
    try{
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());
    
        const body = await  c.req.json();
        const newuser = await prisma.user.create({
            data:{
                email:body.email,
                password: body.password,
                name: body.name
            }
        });
        const payload = {
            sub: newuser.id.toString(),
        };
    
        const token = await sign(payload, c.env.JWT_SECRET);
        return c.json({
            token:token
        });

    } catch(error){
        console.error('Error during signup:', error); // Detailed log for development
        return c.json({ error: 'Internal server error' }, 500);
    }

})

user.post('/signin', (c) => {
    return c.text("signin routes")
})

export default user;