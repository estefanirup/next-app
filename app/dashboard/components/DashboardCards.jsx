"use client";

import { useEffect, useState } from "react";
import { API_POSTGRES } from "../../const";

const COLORS = {
  BEE_YELLOW: "#F2C849",
  HONEY_GOLD: "#F2C063",
  HIVE_BROWN: "#592D23",
  CLOUD_WHITE: "#F5F9F9",
  SKY_BLUE: "#7EB0F2",
};

/* -------------------- Skeleton -------------------- */
function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl p-6 animate-pulse">
      <div className="flex justify-between mb-6">
        <div className="h-4 w-28 bg-gray-200 rounded" />
        <div className="h-8 w-8 bg-gray-200 rounded-lg" />
      </div>

      <div className="h-8 w-24 bg-gray-200 rounded mb-3" />
      <div className="h-3 w-full bg-gray-200 rounded" />
    </div>
  );
}

/* -------------------- Dashboard -------------------- */
export default function DashboardCards() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const headers = {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        };

        const [propertiesRes, hivesRes, devicesRes, sensorsRes] =
          await Promise.all([
            fetch(`${API_POSTGRES}/api/properties`, { headers }),
            fetch(`${API_POSTGRES}/hives`, { headers }),
            fetch(`${API_POSTGRES}/devices`, { headers }),
            fetch(`${API_POSTGRES}/sensors`, { headers }),
          ]);

        const normalize = (res) => res?.content ?? res ?? [];

        const properties = normalize(await propertiesRes.json());
        const hives = normalize(await hivesRes.json());
        const devices = normalize(await devicesRes.json());
        const sensors = normalize(await sensorsRes.json());

        setData({
          properties: properties.length,

          hives: {
            total: hives.length,
            active: hives.filter(
              (h) => h.status?.toUpperCase() === "HEALTHY"
            ).length,
          },

          devices: {
            total: devices.length,
            active: devices.filter(
              (d) => d.status?.toUpperCase() === "ONLINE"
            ).length,
          },

          sensors: {
            total: sensors.length,
            active: sensors.filter(
              (s) =>
                s.status?.toUpperCase() === "ONLINE" ||
                s.status?.toUpperCase() === "ACTIVE"
            ).length,
          },
        });
      } catch (err) {
        console.error("Erro ao carregar dashboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const cards = data
    ? [
        {
          title: "Propriedades",
          value: data.properties,
          subtitle: "cadastradas",
          desc: "Gerencie propriedades rurais",
          icon: "🏡",
          color: COLORS.HONEY_GOLD,
        },
        {
          title: "Colmeias",
          value: `${data.hives.active}/${data.hives.total}`,
          subtitle: "ativas",
          desc: "Colmeias em operação",
          icon: "🐝",
          color: COLORS.BEE_YELLOW,
        },
        {
          title: "Dispositivos",
          value: `${data.devices.active}/${data.devices.total}`,
          subtitle: "ativos",
          desc: "IoT conectados",
          icon: "📟",
          color: COLORS.SKY_BLUE,
        },
        {
          title: "Sensores",
          value: `${data.sensors.active}/${data.sensors.total}`,
          subtitle: "ativos",
          desc: "Monitoramento ambiental",
          icon: "🌡️",
          color: COLORS.HIVE_BROWN,
        },
      ]
    : [];

  return (
    <section
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      style={{ background: COLORS.CLOUD_WHITE }}
    >
      {loading
        ? Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={`skeleton-${i}`} />
          ))
        : cards.map((c) => (
            <div
              key={c.title}
              className="bg-white rounded-2xl p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
              style={{ borderTop: `6px solid ${c.color}` }}
            >
              {/* Header */}
              <div className="flex justify-between mb-4">
                <h3
                  className="text-sm font-semibold uppercase tracking-wide"
                  style={{ color: COLORS.HIVE_BROWN }}
                >
                  {c.title}
                </h3>

                <div
                  className="text-lg"
                  style={{
                    background: `${c.color}33`,
                    padding: "6px 10px",
                    borderRadius: "10px",
                  }}
                >
                  {c.icon}
                </div>
              </div>

              {/* Valor */}
              <div className="mb-2">
                <span
                  className="text-3xl font-bold"
                  style={{ color: COLORS.HIVE_BROWN }}
                >
                  {c.value}
                </span>
                <span className="ml-2 text-sm text-gray-500">
                  {c.subtitle}
                </span>
              </div>

              {/* Descrição */}
              <p className="text-sm text-gray-600">{c.desc}</p>
            </div>
          ))}
    </section>
  );
}
