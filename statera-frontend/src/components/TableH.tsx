import { TableHead, TableHeader, TableRow } from "./ui/table";



export function TableH() {
    return (
        <TableHeader className="bg-muted/50">
            <TableRow>
                <TableHead className="font-medium">Cliente</TableHead>
                <TableHead className="font-medium">Itens</TableHead>
                <TableHead className="font-medium">Total</TableHead>
                <TableHead className="font-medium">Status</TableHead>
                <TableHead className="font-medium text-right">Ações</TableHead>
            </TableRow>
        </TableHeader>
    )
}