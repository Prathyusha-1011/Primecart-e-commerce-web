import mongoose from 'mongoose';

const specSchema = new mongoose.Schema({
    label: { type: String, required: true },
    value: { type: String, required: true },
}, { _id: false });

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        brand: {
            type: String,
            required: true,
            index: true,
        },
        category: {
            type: String,
            required: true,
            index: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
            default: 0,
            index: true,
        },
        originalPrice: {
            type: Number,
            required: true,
            default: 0,
        },
        discount: {
            type: Number,
            default: 0,
        },
        stock: {
            type: Number,
            required: true,
            default: 0,
        },
        ratings: {
            type: Number,
            required: true,
            default: 0,
        },
        rating: {
            type: Number,
            required: true,
            default: 0,
        },
        numReviews: {
            type: Number,
            required: true,
            default: 0,
        },
        image: {
            type: String,
            required: true,
        },
        images: {
            type: [String],
            default: [],
        },
        specs: {
            type: [specSchema],
            default: [],
        },
        specifications: {
            type: [specSchema],
            default: [],
        },
        featured: {
            type: Boolean,
            default: false,
        },
        bestseller: {
            type: Boolean,
            default: false,
        },
        isNewArrival: {
            type: Boolean,
            default: false,
        },
        warranty: {
            type: String,
            default: '1 Year Warranty',
        },
        colorOptions: {
            type: [String],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
