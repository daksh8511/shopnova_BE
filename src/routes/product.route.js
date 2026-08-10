import express from 'express'
import ProuctController from '../controllers/product.controller.js'

const productRoute = express.Router()

productRoute.get('/get' ,ProuctController.GetAllProduct)
productRoute.get('/get/particular_product/:id' ,ProuctController.ParticularProducts)
productRoute.get('/search_product' ,ProuctController.SearchProduct)

export default productRoute