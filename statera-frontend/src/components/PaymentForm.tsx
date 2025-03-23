import { api } from "@/config/api";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

type Props = {
  orderId: string;
  total: number;
  onPaymentSuccess?: () => void; 
};

export function PaymentForm({ orderId, total, onPaymentSuccess }: Props) {
  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState<string | undefined | null>(null);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) {
      setError("Stripe não inicializado.");
      return;
    }

    if (!total || total <= 0) {
      setError("O valor do pedido é inválido.");
      return;
    }

    setProcessing(true);
    setError(null);
    setSuccess(false);

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setError("Elemento de cartão não encontrado.");
      setProcessing(false);
      return;
    }

    try {
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (error) {
        setError(error.message);
        setProcessing(false);
        return;
      }

      const response = await api.post("/payments", {
        amount: total,
        paymentMethodId: paymentMethod!.id,
        orderId,
      });

      if (response.data.success) {
        await api.put(`/orders/${orderId}`, { status: "pago" });

        setSuccess(true);
        toast("Pagamento concluído", {
          description: `O pagamento de R$${total.toFixed(2)} foi processado com sucesso.`,
          style: { backgroundColor: "#16a34a", color: "#fff" },
        });

        if (onPaymentSuccess) {
          onPaymentSuccess();
        }
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "Erro desconhecido";
      setError("Erro ao processar pagamento: " + errorMessage);
      toast.error("Erro no pagamento", {
        description: "Não foi possível processar o pagamento. Detalhes: " + errorMessage,
      });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handlePayment} className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Pagamento</CardTitle>
          <CardDescription>Insira os detalhes do cartão para pagar R${total.toFixed(2)}</CardDescription>
        </CardHeader>
        <CardContent>
          <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
          {error && <p className="text-red-500 mt-2">{error}</p>}
          {success && <p className="text-green-500 mt-2">Pagamento concluído com sucesso!</p>}
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={!stripe || processing}>
            {processing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Processando...
              </>
            ) : (
              "Pagar agora"
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}