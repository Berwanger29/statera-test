import Link from "next/link"
import { Button } from "./ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "./ui/dropdown-menu"
import { TableCell, TableRow } from "./ui/table"
import { DotsThree, File } from "@phosphor-icons/react"
import { TypeTableR } from "@/@types/TypeTableR"
import { Badge } from "./ui/badge"
import { TypeStatus } from "@/@types/TypeStatus"


export function TableR({ client, itens, status, total, id }: TypeTableR) {

    console.log(status)

    function getStatusBadge(status: TypeStatus) {
        switch (status) {
            case "pendente":
                return (
                    <Badge
                        variant="outline"
                        className="bg-yellow-500/20 text-yellow-500"
                    >
                        {status}
                    </Badge>
                )
            case "pago":
                return (
                    <Badge variant="outline" className="bg-green-500/20 text-green-500">
                        {status}
                    </Badge>
                )
            case "cancelado":
                return (
                    <Badge variant="outline" className="bg-red-500/20 text-red-500">
                        {status}
                    </Badge>
                )
            default:
                return <Badge>{status}</Badge>
        }
    }

    return (
        <TableRow className="hover:bg-muted/30">
            <TableCell className="font-medium">{client}</TableCell>
            <TableCell className="max-w-[200px] truncate" title={itens}>
                {itens}
            </TableCell>
            <TableCell className="font-mono">R$ {total.toFixed(2).replace(".", ",")}</TableCell>
            <TableCell>
                {getStatusBadge(status)}
            </TableCell>
            <TableCell className="text-right">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <DotsThree size={32} />
                            <span className="sr-only">Abrir menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                            <Link href={`/orders/${id}`} className="flex items-center">
                                <File size={32} weight="light" />
                                Ver Detalhes
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
        </TableRow>
    )
}