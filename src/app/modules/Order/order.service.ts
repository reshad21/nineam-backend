import { initiatePayment } from '../payment/payment.utils';
import { Order } from './order.model';

const createOrder = async (orderData: any) => {
    const transactionId = `TXN-${Date.now()}`;

    const payload = {
        ...orderData,
        status: "Pending",
        paymentStatus: "Pending",
        transactionId
    };

    const result = await Order.create(payload);

    const paymentData = {
        transactionId,
        amount: orderData.finalPrice,
        customerName: orderData.userInfo.fullName,
        customerEmail: orderData.userInfo.email,
        customerPhone: orderData.userInfo.phone,
        customerAddress: orderData.userInfo.address,
    }
    //payment
    const paymentSession = await initiatePayment(paymentData);
    console.log(paymentSession);
    // return result;
    return paymentSession;
};




export const orderService = {
    createOrder
}