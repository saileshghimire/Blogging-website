import { Hono } from 'hono'
import user from '../src/userPage/user';
import Blog from '../src/blogpage/blogpage'

const app = new Hono()

app.route('/api/v1/user',user)
app.route('/api/v1/blog', Blog)
export default app
