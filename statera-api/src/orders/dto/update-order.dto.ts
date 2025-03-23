export class UpdateOrderDto {
    id?: string;
    client?: string;
    itens?: string;
    total?: number;
    status: 'pendente' | 'pago' | 'cancelado';
}
