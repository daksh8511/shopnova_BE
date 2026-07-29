import express from 'express'
import AuthController from '../controllers/auth.controller.js'

const authRoute = express.Router()

authRoute.post('/signup' ,AuthController.Signup)
authRoute.post('/login' ,AuthController.Login)
authRoute.put('/set_address/:id', AuthController.SetAddress)

export default authRoute