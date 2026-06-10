import express from 'express'
import type { Application, NextFunction, Request, Response } from 'express'
import { UserRoutes } from './routes/use.routes.js'


const app : Application = express()
const userRoutes = new UserRoutes()

app.use(express.json())
app.use('/', userRoutes.getRoutes())

app.use(express.urlencoded({ extended: true }))

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
        return response.status(400).json({
            message: err.message
        })
    }
    return response.status(500).json({
        status: '500',
        message: 'Internal Server Error'
    })
})

app.listen(3333, () => {
    console.log('Server is running on port 3333')
})
