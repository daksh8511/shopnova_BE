import express from 'express'
import CartController from '../controllers/cart.controller.js'

const CartRoutes = express.Router()

CartRoutes.post('/add_cart', CartController.AddToCart)
CartRoutes.get('/get/:userId', CartController.GetCart)
CartRoutes.post('/product_remove', CartController.RemoveFromCart)
CartRoutes.post('/update_product', CartController.UpdateProduct)

export default CartRoutes