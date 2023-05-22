import 'dotenv/config'

import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import { memoriesRoutes } from './routes/memories'
import { authRoutes } from './routes/auth'
import multipart from '@fastify/multipart'
import { uploadRoutes } from './routes/upload'
import { resolve } from 'node:path'

const app = fastify()

app.register(multipart)
app.register(require('@fastify/static'), {
  root: resolve(__dirname, '../uploads'),
  prefix: '/uploads',
})
app.register(cors, { origin: true })
app.register(jwt, {
  secret: 'spacetime',
})
app.register(memoriesRoutes)
app.register(authRoutes)
app.register(uploadRoutes)

app
  .listen({
    port: 5000,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('HTTP server running on http://localhost:5000')
  })
