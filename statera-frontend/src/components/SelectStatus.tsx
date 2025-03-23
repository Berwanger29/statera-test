import { Order } from "@/@types/TypeOrder";
import { TypeStatus } from "@/@types/TypeStatus";
import {
  CheckCircle,
  Clock,
  XCircle,
} from "@phosphor-icons/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type Props = {
  order: Order;
  updating: boolean;
  onStatusChange: (newStatus: TypeStatus) => void;
};

export function SelectStatus({ order, updating, onStatusChange }: Props) {
  return (
    <Select
      value={order.status}
      onValueChange={onStatusChange} 
      disabled={updating}
    >
      <SelectTrigger className="w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="pendente" className="flex items-center gap-2">
          <Clock size={32} className="text-yellow-500" />
          <span>Pendente</span>
        </SelectItem>
        <SelectItem value="pago" className="flex items-center gap-2">
          <CheckCircle size={32} className="text-green-500" />
          <span>Pago</span>
        </SelectItem>
        <SelectItem value="cancelado" className="flex items-center gap-2">
          <XCircle size={32} className="text-red-500" />
          <span>Cancelado</span>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}