"use client";

import { useEffect, useState } from "react";
import { API_POSTGRES } from "../const";

import DeviceList from "../components/DeviceList";
import HiveList from "../components/HiveList";
import PropertyList from "../components/PropertyList";
import SensorList from "../components/SensorList";

export default function DashboardPage() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("idToken");
    if (!storedToken) {
      window.location.href = "/login";
      return;
    }
    setToken(storedToken);

    // Pegar username do token
    try {
      const payload = JSON.parse(atob(storedToken.split(".")[1]));
      setUser(payload["cognito:username"] || payload["email"]);
    } catch (e) {
      console.error("Erro ao decodificar token", e);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("idToken");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login";
  };

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard - {user}</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Sair
        </button>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Dispositivos</h2>
        <DeviceList token={token} />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Colmeias</h2>
        <HiveList token={token} />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Propriedades</h2>
        <PropertyList token={token} />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Sensores</h2>
        <SensorList token={token} />
      </section>
    </main>
  );
}
