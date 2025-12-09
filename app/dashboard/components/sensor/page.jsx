"use client";

import { useEffect, useState } from "react";
import Link from "next/link"; // ✅ Import necessário
import { API_POSTGRES } from "../../../const";

const COLORS = {
  BEE_YELLOW: "#F2C849",
  HONEY_GOLD: "#F2C063",
  HIVE_BROWN: "#592D23",
  CLOUD_WHITE: "#F5F9F9",
  SKY_BLUE: "#7EB0F2",
};

export default function SensorList() {
  const [sensors, setSensors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSensors = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      try {
        const res = await fetch(`${API_POSTGRES}/sensors?page=0&size=10`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        const data = await res.json();
        setSensors(data.content || data);
      } catch (err) {
        console.error("Erro ao buscar sensores:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSensors();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48 text-gray-500">
        Carregando sensores...
      </div>
    );
  }

  return (
    <section
      className="p-8 min-h-screen"
      style={{ background: COLORS.CLOUD_WHITE }}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        {/* Título + contador */}
        <div>
          <h1
            className="text-2xl font-semibold mb-1"
            style={{ color: COLORS.HIVE_BROWN }}
          >
            🌡️ Sensores
          </h1>

          <span
            className="inline-block text-xs px-3 py-1 rounded-full"
            style={{
              background: COLORS.HONEY_GOLD,
              color: COLORS.HIVE_BROWN,
              fontWeight: 600,
            }}
          >
            {sensors.length} registrados
          </span>
        </div>

        {/* BOTÃO NOVO SENSOR */}
        <Link
          href="/dashboard/components/sensor/new"
          className="
            flex items-center gap-2
            px-5 py-2.5
            rounded-xl
            text-sm font-semibold
            shadow-sm transition-all
            hover:-translate-y-0.5 hover:shadow-md
          "
          style={{
            background: COLORS.HIVE_BROWN,
            color: "#fff",
          }}
        >
          <span className="text-lg">＋</span>
          Novo sensor
        </Link>
      </div>

      {/* Estado vazio */}
      {sensors.length === 0 ? (
        <div className="bg-white rounded-xl p-10 text-center text-gray-500 shadow-sm">
          Nenhum sensor cadastrado.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sensors.map((sensor, index) => (
            <div
              key={sensor.id ?? `sensor-${index}`}
              className="bg-white rounded-2xl p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Tipo do Sensor */}
              <h3
                className="text-lg font-semibold mb-3"
                style={{ color: COLORS.HIVE_BROWN }}
              >
                {sensor.type}
              </h3>

              {/* Unidade de Medida */}
              <div className="text-sm text-gray-600 mb-4">
                Unidade: {sensor.measurementUnit}
              </div>

              {/* Separador */}
              <div className="h-px bg-gray-200 mb-4" />

              {/* Valor e Status */}
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-700">
                  Valor atual: <strong>{sensor.lastValue ?? "--"}</strong>
                </span>

                <span
                  className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{
                    background:
                      sensor.status === "ATIVO"
                        ? "rgba(126,176,242,0.15)"
                        : "rgba(242,192,99,0.25)",
                    color: COLORS.HIVE_BROWN,
                  }}
                >
                  {sensor.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
