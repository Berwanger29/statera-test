import Link from "next/link";
import { Button } from "./ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "./ui/card";
import { ArrowLeft } from "@phosphor-icons/react";
import { Separator } from "./ui/separator";

type Props = {
    error: string;
}

export function ErrorCard({ error }: Props) {
    return (
        <Card
            className="border shadow-sm bg-red-200"
        >
            <CardHeader >
                <CardTitle>Erro</CardTitle>
                <CardDescription>{error}</CardDescription>
            </CardHeader>
            <Separator className="my-4 bg-white" />
            <CardContent>
                <div className="flex justify-center gap-4">
                    <Button variant="outline" asChild>
                        <Link href="/orders">
                            <ArrowLeft size={32} />
                            Voltar para pedidos
                        </Link>
                    </Button>
                    <Button onClick={() => window.location.reload()}>Tentar novamente</Button>
                </div>
            </CardContent>
        </Card>
    )
}