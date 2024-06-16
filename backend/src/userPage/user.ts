import { Hono } from 'hono'

const user = new Hono()

user.post('/signup', (c) => {
    return c.text("signup routes")
})

user.post('/signin', (c) => {
    return c.text("signin routes")
})

export default user;