"use client"
import { useEffect, useState } from "react"
import { Order } from "@/@types/TypeOrder"
import { api } from "@/config/api"

import { Loading } from "@/components/Loading"
import { MenuHeader } from "@/components/MenuHeader"
import { TableH } from "@/components/TableH"
import { TableR } from "@/components/TableR"

import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody } from "@/components/ui/table"


export default function OrdersDashboard() {

    const [allOrders, setAllOrders] = useState<Order[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true)

    async function fetchOrders() {
        setLoading(true);
        try {
            const response = await api.get("/orders");
            const fetchedOrders = response.data || [];
            setAllOrders(fetchedOrders);
            setOrders(fetchedOrders);
        } catch (error) {
            console.error("Erro ao buscar pedidos:", error);
            setAllOrders([]);
            setOrders([]);
        } finally {
            setLoading(false);
        }
    }

    function filterByStatus(status: string) {
        console.log("Filtrando por status:", status);
        if (status === "todos") {
            console.log("Exibindo todos os pedidos:", allOrders);
            setOrders(allOrders);
        } else {
            const filteredOrders = allOrders.filter((order) => {
                return order.status === status;
            });
            setOrders(filteredOrders);
        }
    }


    useEffect(() => {
        fetchOrders()
    }, [])

    if (loading) {
        return <Loading />
    }

    return (
        <div className="container mx-auto p-4 max-w-6xl">
            <Card className="border shadow-sm py-0">
                <MenuHeader
                    ordersAmount={orders.length}
                    filterByStatus={filterByStatus}
                />
                <CardContent className="p-6">
                    <div className="rounded-md border overflow-hidden">
                        <Table>
                            <TableH />
                            <TableBody>
                                {orders.map((order) => (
                                    <TableR
                                        key={order.id}
                                        client={order.client}
                                        itens={order.itens}
                                        total={order.total}
                                        status={order.status}
                                        id={order.id}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

