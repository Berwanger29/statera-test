import { TypeStatus } from "./TypeStatus";

export type TypeTableR = {
    id: string;
    client: string;
    itens: string;
    total: number;
    status: "pendente" | "pago" | "cancelado"
}
