import Link from "next/link";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { ArrowLeft } from "@phosphor-icons/react";


export function OrderNotFound() {
    return (
        <div className="container mx-auto p-4 max-w-3xl">
            <Card>
                <CardHeader>
                    <CardTitle>Peidido não encontrado</CardTitle>
                    <CardDescription>
                        O pedido que você está procurando não existe ou foi removido.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button asChild>
                        <Link href="/orders">
                            <ArrowLeft size={32} />
                            Voltar para pedidos
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}