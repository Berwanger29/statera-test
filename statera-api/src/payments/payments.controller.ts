import { Body, Controller, Post } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
    constructor(private readonly paymentsService: PaymentsService) { }

    @Post()
    async createPayment(
        @Body('amount') amount: number,
        @Body('paymentMethodId') paymentMethodId: string,
        @Body('orderId') orderId: string
    ) {
        return this.paymentsService.createPaymentIntent(amount, paymentMethodId, orderId)
    }
}
