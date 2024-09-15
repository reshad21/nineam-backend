import axios from "axios";
import config from "../../config";

export const initiatePayment = async (paymentData: any) => {
    const response = await axios.post(config.payment_url as string, {
        store_id: config.store_id,
        signature_key: config.signature_key,
        tran_id: paymentData.transactionId,
        success_url: "http://localhost:5000/api/payment/confirmation",
        fail_url: "http://www.merchantdomain.com/failedpage.html",
        cancel_url: "http://www.merchantdomain.com/cancelpage.html",
        amount: "10.0",
        currency: "BDT",
        desc: "Merchant Registration Payment",
        cus_name: paymentData.customerName,
        cus_email: paymentData.customerEmail,
        cus_add1: paymentData.customerAddress,
        cus_add2: "N/A",
        cus_city: "N/A",
        cus_state: "N/A",
        cus_postcode: "N/A",
        cus_country: "N/A",
        cus_phone: paymentData.customerPhone,
        type: "json"
    });

    // console.log(response);
    return response.data;
}