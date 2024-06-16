import { Hono } from "hono";

const Blog = new Hono()

Blog.post('/', (c)=>{
    return c.text("blogpost page")
})

Blog.put('/', (c) => {
    return c.text("Blog editing page")
})

Blog.get('/:id', (c) => {
    const id = c.req.param('id')
    return c.text(`getting blog of id ${id}`)
})

Blog.get('/bulk', (c) => {
    return c.text('bulk post page')
})

export default Blog;