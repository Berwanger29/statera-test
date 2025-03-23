"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gray-800">
            Dashboard de pedidos
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button asChild variant="default" size="lg">
            <Link href="/orders">
              Entrar
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}