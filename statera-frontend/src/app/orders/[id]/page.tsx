"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";


import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { api } from "@/config/api";

import { TypeStatus } from "@/@types/TypeStatus";
import { Order } from "../../../@types/TypeOrder";

import { Loading } from "@/components/Loading";
import { ErrorCard } from "@/components/ErrorCard";
import { PaymentForm } from "@/components/PaymentForm";
import { SelectStatus } from "@/components/SelectStatus";
import { OrderNotFound } from "@/components/OrderNotFound";
import { AlertDestructive } from "@/components/AlertDestructive";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowLeft,
  ShoppingBagOpen,
  Package,
  User,
} from "@phosphor-icons/react";

type NewStatusProps = {
  newStatus: TypeStatus;
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK as string);

export default function OrderDetailsPage() {
  const router = useRouter();
  const { id } = useParams();

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchOrder() {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/orders/${id}`);
      setOrder(response.data);
    } catch (error) {
      console.error("Erro ao buscar pedido:", error);
      setError("Não foi possível carregar os detalhes do pedido. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  }

  const handleStatusChange = async (newStatus: TypeStatus) => {
    if (order?.status === newStatus) return;

    setUpdating(true);
    try {
      await api.put(`/orders/${id}`, { ...order, status: newStatus });
      setOrder((prev: Order | null) => (prev ? { ...prev, status: newStatus } : null));

      const toastColor: string =
        newStatus === "pago"
          ? "#16a34a"
          : newStatus === "cancelado"
            ? "#ef4444"
            : "#eab308";

      toast("Status atualizado", {
        description: `O status do pedido foi alterado para ${getStatusLabel(newStatus)}.`,
        style: {
          backgroundColor: toastColor,
          color: "#fff",
        },
      });
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
      toast.error("Erro ao atualizar status", {
        description: "Não foi possível atualizar o status do pedido.",
        action: {
          label: "Tentar novamente",
          onClick: () => handleStatusChange(newStatus),
        },
      });
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/orders/${id}`);
      toast("Pedido excluído", {
        description: "O pedido foi excluído com sucesso.",
      });
      router.push("/orders");
    } catch (error) {
      console.error("Erro ao excluir pedido:", error);
      toast("Erro ao excluir pedido", {
        description: "Não foi possível excluir o pedido.",
      });
    }
  };

  const handlePaymentSuccess = () => {
    setOrder((prev) => (prev ? { ...prev, status: "pago" } : null));
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pendente":
        return "Pendente";
      case "pago":
        return "Pago";
      case "cancelado":
        return "Cancelado";
      default:
        return status;
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 max-w-3xl">
        <ErrorCard error={error} />
      </div>
    );
  }

  if (!order) {
    return <OrderNotFound />;
  }

  return (
    <>
      <div className="container mx-auto p-4 max-w-3xl">
        <Card className="border shadow-sm py-0">
          <CardHeader className="bg-black rounded-t-lg py-4">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <CardTitle className="text-2xl font-bold flex items-center gap-2 text-white">
                  <ShoppingBagOpen size={32} />
                  Detalhes do Pedido
                </CardTitle>
                <CardDescription className="text-primary-foreground/80 mt-1">
                  ID: {order.id}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-muted-foreground">Cliente</span>
                  <div className="flex items-center gap-2 mt-1">
                    <User size={24} className="text-muted-foreground" />
                    <span className="text-lg font-medium">{order.client}</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-muted-foreground">Total</span>
                  <span className="text-2xl font-bold font-mono">
                    R$ {order.total.toFixed(2).replace(".", ",")}
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-muted-foreground">Status</span>
                  <div className="mt-1">
                    <SelectStatus
                      order={order}
                      updating={updating}
                      onStatusChange={handleStatusChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <Separator />
            <div>
              <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                <Package size={32} />
                Itens do Pedido
              </h3>
              <div className="bg-muted/30 p-4 rounded-lg">
                <p className="whitespace-pre-line">{order.itens}</p>
              </div>
            </div>
            {order.status === "pendente" && (
              <>
                <Separator />
                <Elements stripe={stripePromise}>
                  <PaymentForm
                    orderId={order.id}
                    total={order.total}
                    onPaymentSuccess={handlePaymentSuccess}
                  />
                </Elements>
              </>
            )}
          </CardContent>
          <CardFooter className="flex justify-between p-6 pt-0">
            <Button variant="outline" asChild>
              <Link href="/orders">
                <ArrowLeft size={32} />
                Voltar
              </Link>
            </Button>
            <AlertDestructive onClick={handleDelete} />
          </CardFooter>
        </Card>
      </div>
      <Toaster />
    </>
  );
}