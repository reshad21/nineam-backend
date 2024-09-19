import { readFileSync } from "fs";
import { join } from "path";
import { Order } from "../Order/order.model";
import { verifyPayment } from "./payment.utils";

const confirmationService = async (transactionId: string, status: string) => {
    const verifyResponse = await verifyPayment(transactionId);
    // console.log(verifyResponse.pay_status);
    let result;
    let message = ""
    if (verifyResponse && verifyResponse.pay_status == 'Successful') {
        result = await Order.findOneAndUpdate({ transactionId }, {
            paymentStatus: "Paid"
        });
        message = "Successfully Paid!";
        //search
        // if (result) {
        //     bookingDetails = await Booking.findById(result.bookingId);
        // }
    } else {
        message = "Payment Failed!"
    }

    const filePath = join(__dirname, '../../../views/confirmation.html');
    let template = readFileSync(filePath, 'utf-8');
    template = template.replace('{{message}}', message)


    return template;

}

export const paymentServices = {
    confirmationService
}