import { Plus, ShoppingBag } from '@phosphor-icons/react';
import { CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Props = {
  ordersAmount: number;
  filterByStatus: (status: string) => void;
};

export function MenuHeader({ ordersAmount, filterByStatus }: Props) {
  return (
    <CardHeader className="bg-black rounded-t-lg pt-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-2">
        <div>
          <CardTitle className="text-2xl font-bold text-white flex items-center gap-2">
            <ShoppingBag size={32} />
            Dashboard de Pedidos
          </CardTitle>
          <CardDescription className="text-primary-foreground/80 mt-1">
            Gerencie todos os pedidos em um só lugar
          </CardDescription>
          <p className="text-primary-foreground/80 text-sm mt-1">
            {ordersAmount} pedidos
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-2">
          <Select onValueChange={filterByStatus} defaultValue="todos">
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue placeholder="Filtrar por status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="pendente">Pendente</SelectItem>
              <SelectItem value="pago">Pago</SelectItem>
              <SelectItem value="cancelado">Cancelado</SelectItem>
            </SelectContent>
          </Select>
          <Link href="/orders/new">
            <Button variant="outline" className="hover:cursor-pointer">
              Novo pedido
              <Plus size={32} color="black" weight="bold" />
            </Button>
          </Link>
        </div>
      </div>
    </CardHeader>
  );
}