import { z } from "zod";

export const newOrderChema = z.object({
    client: z.string({ invalid_type_error: "Apenas caracteres comuns são permitidos" }).min(1, "O nome do cliente é obrigatório"),
    itens: z.string({ invalid_type_error: "Apenas caracteres comuns são permitidos" }).min(1, "Os itens são obrigatórios"),
    total: z.number({ invalid_type_error: "Apenas números são permitidos" }).min(100, "O total deve ser um valor maior do que 100"),
    status: z.enum(["pendente", "pago", "cancelado"], {
        required_error: "O status é obrigatório",
    }),
});

export type NewOrderTypes = z.infer<typeof newOrderChema>;