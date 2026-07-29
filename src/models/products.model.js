import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        default: 0
    },
    image: {
        type: String,
        requierd: true
    },
    category : {
        type : String,
        enum : ['electronics', 'fashion', 'home_living', 'sports', 'beauty'],
        required : true
    }
}, {
    timestamps: true
})

const ProductsModel = mongoose.model('product', ProductSchema)

export default ProductsModel