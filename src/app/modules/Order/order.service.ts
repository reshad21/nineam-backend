import { Order } from './order.model';

const createOrder = async (orderData: any) => {
    const payload = {
        ...orderData,
        status: "Pending",
        paymentStatus: "Pending",
        transactionId: `TXN-${Date.now()}` // Generate a unique transactionId
    };

    const result = await Order.create(payload);
    return result;
};




export const orderService = {
    createOrder
}