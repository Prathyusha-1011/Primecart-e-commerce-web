import Order from '../models/Order.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const addOrderItems = async (req, res, next) => {
    try {
        const { orderItems, shippingAddress, totalPrice, paymentStatus } = req.body;

        if (orderItems && orderItems.length === 0) {
            res.status(400);
            throw new Error('No order items');
        } else {
            const order = new Order({
                orderItems: orderItems.map((x) => ({
                    ...x,
                    product: x._id,
                })),
                user: req.user._id,
                shippingAddress,
                totalPrice,
                paymentStatus,
            });

            const createdOrder = await order.save();

            req.io.emit('newOrder', createdOrder);
            res.status(201).json(createdOrder);
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Get logged in user orders
// @route   GET /api/orders
// @access  Private
export const getMyOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({ user: req.user._id });
        res.json(orders);
    } catch (error) {
        next(error);
    }
};
