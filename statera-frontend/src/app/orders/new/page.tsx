"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/config/api";
import { newOrderChema, NewOrderTypes } from "./newOrderSchema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


export default function NewOrderPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewOrderTypes>({
    resolver: zodResolver(newOrderChema),
    defaultValues: {
      client: "",
      itens: "",
      total: 0,
      status: "pendente",
    },
  });

  async function handleNewOrder(data: NewOrderTypes) {
    try {
      await api.post("/orders", data);
      router.push("/orders");
    } catch (error) {
      console.error("Erro ao criar pedido:", error);
      alert("Falha ao criar o pedido.");
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <Card className="border-none shadow-lg">
        <CardHeader className="bg-primary text-secondary p-4 rounded-t-lg">
          <CardTitle>Novo Pedido</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit(handleNewOrder)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Cliente
              </label>
              <Input
                type="text"
                {...register("client")}
                className="mt-1"
              />
              {errors.client && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.client.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Itens
              </label>
              <Input
                type="text"
                {...register("itens")}
                className="mt-1"
              />
              {errors.itens && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.itens.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Total (R$)
              </label>
              <Input
                type="number"
                {...register("total", { valueAsNumber: true })}
                className="mt-1"
              />
              {errors.total && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.total.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="bg-primary text-secondary hover:cursor-pointer"
            >
              Criar Pedido
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}