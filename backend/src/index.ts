import { Hono } from 'hono'
import user from '../src/userPage/user';
import Blog from '../src/blogpage/blogpage'
import { cors } from 'hono/cors';


const app = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>()

app.use('/*', cors());
app.route('/api/v1/user',user)
app.route('/api/v1/blog', Blog)
export default app
