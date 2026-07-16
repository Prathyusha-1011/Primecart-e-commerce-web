import Product from '../models/Product.js';

// @desc    Fetch all products with filtering, search, and sorting
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res, next) => {
    try {
        const { category, brand, minPrice, maxPrice, search, sort } = req.query;
        const query = {};

        // Category filter
        if (category && category !== 'all') {
            query.category = category;
        }

        // Brand filter
        if (brand && brand !== 'all') {
            query.brand = brand;
        }

        // Search filter (searches name or description case-insensitively)
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
            ];
        }

        // Price range filter
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) {
                query.price.$gte = Number(minPrice);
            }
            if (maxPrice) {
                query.price.$lte = Number(maxPrice);
            }
        }

        // Sort configuration
        let sortQuery = {};
        if (sort) {
            if (sort === 'price-asc') {
                sortQuery = { price: 1 };
            } else if (sort === 'price-desc') {
                sortQuery = { price: -1 };
            } else if (sort === 'rating') {
                sortQuery = { rating: -1 };
            } else if (sort === 'newest') {
                sortQuery = { createdAt: -1 };
            }
        }

        const products = await Product.find(query).sort(sortQuery);
        res.json(products);
    } catch (error) {
        next(error);
    }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404);
            throw new Error('Product not found');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res, next) => {
    try {
        const product = new Product({
            name: req.body.name || 'Sample name',
            price: req.body.price || 0,
            description: req.body.description || 'Sample description',
            image: req.body.image || '/images/sample.jpg',
            category: req.body.category || 'Sample category',
            stock: req.body.stock || 0,
            ratings: 0,
        });

        const createdProduct = await product.save();
        req.io.emit('productCreated', createdProduct);
        res.status(201).json(createdProduct);
    } catch (error) {
        next(error);
    }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res, next) => {
    try {
        const { name, price, description, image, category, stock } = req.body;

        const product = await Product.findById(req.params.id);

        if (product) {
            product.name = name || product.name;
            product.price = price || product.price;
            product.description = description || product.description;
            product.image = image || product.image;
            product.category = category || product.category;
            product.stock = stock || product.stock;

            const updatedProduct = await product.save();
            req.io.emit('productUpdated', updatedProduct);
            res.json(updatedProduct);
        } else {
            res.status(404);
            throw new Error('Product not found');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            await Product.deleteOne({ _id: product._id });
            req.io.emit('productDeleted', product._id);
            res.json({ message: 'Product removed' });
        } else {
            res.status(404);
            throw new Error('Product not found');
        }
    } catch (error) {
        next(error);
    }
};
