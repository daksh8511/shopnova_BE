import express from 'express'
import ProuctController from '../controllers/product.controller.js'

const productRoute = express.Router()

productRoute.post('/create' ,ProuctController.CreateProducts)
productRoute.put('/update/:id' ,ProuctController.UpdateProduct)
productRoute.delete('/delete/:id' ,ProuctController.DeleteProdct)
productRoute.get('/get' ,ProuctController.GetAllProduct)
productRoute.get('/get/particular_product/:id' ,ProuctController.ParticularProducts)
productRoute.get('/search_product' ,ProuctController.SearchProduct)

export default productRoute