import { TypeStatus } from "./TypeStatus";

export type Order = {
    id: string;
    client: string;
    itens: string;
    total: number;
    status: TypeStatus
};