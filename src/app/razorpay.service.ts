import { Injectable } from '@angular/core';
import { PaymentStatusService } from './services/payment-status.service';

declare var Razorpay: any;

@Injectable({
  providedIn: 'root'
})
export class RazorpayService {

  constructor(private paymentStatusService: PaymentStatusService) {}

  payWithRazorpay(orderId: string, amount: number) {
    const options = {
        key: 'rzp_test_GqAs1q7wdge37g', // Replace with your Razorpay Key
        amount: amount * 100, // Convert amount to paise
        currency: "INR",
        name: "AD Connect",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: orderId,
        handler: (response: any) => {
            // Call function on successful payment
            this.onPaymentSuccess(response);
            console.log(response)
        },
        prefill: {
          name: 'Shivank Sharma',
          email: 'sharmashivank905@gmail.com',
          contact: '8934909115'
        },
        notes: {
            address: "AD Connect Corporate Office"
        },
        theme: {
            color: "#63040D"
        }
    };

    const rzp = new Razorpay(options);

    rzp.on('payment.failed', (response: any) => {
      // Call function on failed payment
      this.onPaymentFailure(response);
    });

    rzp.open();
  }

  onPaymentSuccess(response: any) {
    console.log("Payment Success", response);

    this.paymentStatusService.updatePaymentStatus({
      success: true,
      paymentId: response.razorpay_payment_id,
      orderId: response.razorpay_order_id,
      paymentSignature : response.razorpay_signature
    });

  }

  onPaymentFailure(response: any) {
    console.error("Payment Failure", response);

    this.paymentStatusService.updatePaymentStatus({
      success: false,
      error: response.error.description
    });
 
  }
}
