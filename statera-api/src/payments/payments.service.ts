import { BadRequestException, Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
    private stripe: Stripe;

    constructor() {
        this.stripe = new Stripe(process.env.STRIPE_SK as string, {
            apiVersion: '2025-02-24.acacia'
        })
    }

    async createPaymentIntent(amount: number, paymentMethodId: string, orderId: string) {
        try {
            if (!amount || amount <= 0) {
                throw new BadRequestException('O valor de pagamento deve ser maior que zero');
            }
            if (!paymentMethodId) {
                throw new BadRequestException('O método de pagamento é obrigatório');
            }
            if (!orderId) {
                throw new BadRequestException('O pedido é obrigatório');
            }

            const paymentIntent = await this.stripe.paymentIntents.create({
                amount,
                currency: 'brl',
                payment_method: paymentMethodId,
                confirm: true, 
                automatic_payment_methods: {
                    enabled: true,          
                    allow_redirects: 'never', 
                },
                metadata: { orderId },
            });


            return {
                success: true,
                paymentIntent
            }
        } catch (error) {
            if (error instanceof Stripe.errors.StripeError) {
                throw new BadRequestException(`Erro ao processar pagamento: ${error.message}`)
            }

            throw new BadRequestException('Erro interno ao processar pagamento')
        }
    }
}
