"use client";

import { useEffect, useState } from "react";
import { API_POSTGRES } from "../../../const";

const COLORS = {
  BEE_YELLOW: "#F2C849",
  HONEY_GOLD: "#F2C063",
  HIVE_BROWN: "#592D23",
  CLOUD_WHITE: "#F5F9F9",
};

export default function DeviceList() {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

 
  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    setToken(storedToken);
  }, []);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchDevices = async () => {
      try {
        const res = await fetch(
          `${API_POSTGRES}/devices?page=0&size=10`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        if (!res.ok) throw new Error("Erro ao carregar dispositivos");

        const data = await res.json();
        setDevices(data.content || data);
      } catch (err) {
        console.error("Erro ao buscar dispositivos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDevices();
  }, [token]); 

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48 text-gray-500">
        Carregando dispositivos...
      </div>
    );
  }

  return (
    <section
      className="p-8 min-h-screen"
      style={{ background: COLORS.CLOUD_WHITE }}
    >
      {/* Cabeçalho */}
      <div className="flex items-center justify-between mb-8">
        <h1
          className="text-2xl font-semibold"
          style={{ color: COLORS.HIVE_BROWN }}
        >
          Dispositivos
        </h1>

        <span
          className="text-sm px-4 py-1 rounded-full"
          style={{
            background: COLORS.HONEY_GOLD,
            color: COLORS.HIVE_BROWN,
            fontWeight: 600,
          }}
        >
          {devices.length} registros
        </span>
      </div>

      {devices.length === 0 ? (
        <div className="bg-white rounded-xl p-10 text-center text-gray-500 shadow-sm">
          Nenhum dispositivo cadastrado.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {devices.map((device, index) => (
            <div
              key={device.id ?? `device-${index}`}
              className="bg-white rounded-2xl p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <h3
                className="text-lg font-semibold mb-3"
                style={{ color: COLORS.HIVE_BROWN }}
              >
                {device.model}
              </h3>

              <span
                className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4"
                style={{
                  background:
                    device.status === "ATIVO"
                      ? "#E6F4EA"
                      : "#E5E7EB",
                  color:
                    device.status === "ATIVO"
                      ? "#1E7A3A"
                      : "#4B5563",
                }}
              >
                {device.status}
              </span>

              <div className="h-px bg-gray-200 mb-4" />

              <p className="text-sm text-gray-700">
                <strong>Bateria:</strong> {device.batteryStatus}%
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
