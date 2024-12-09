import { Hono } from 'hono'
import main from '../routes/main'
import { cors } from 'hono/cors'
const app = new Hono()
app.route('/api/v1',main)
app.use('/*',cors())
export default app
