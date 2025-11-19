"use client";

import DashboardLayout from "./components/DashboardLayout";
import DashboardCards from "./components/DashboardCards";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold text-[#592D23] mb-2">Visão Geral</h1>
      <p className="text-gray-600 mb-6">
        Bem-vindo(a)! Aqui você encontra um resumo inicial das informações do sistema.
      </p>

      <DashboardCards />
    </DashboardLayout>
  );
}
