"use client";

import { useEffect, useState } from "react";
import Link from "next/link"; // ✅ Import necessário para Link
import { API_POSTGRES } from "../../../const";

const COLORS = {
  BEE_YELLOW: "#F2C849",
  HONEY_GOLD: "#F2C063",
  HIVE_BROWN: "#592D23",
  CLOUD_WHITE: "#F5F9F9",
  SKY_BLUE: "#7EB0F2",
};

export default function HiveList() {
  const [hives, setHives] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHives = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      try {
        const res = await fetch(`${API_POSTGRES}/hives?page=0&size=10`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        const data = await res.json();
        setHives(data.content || data);
      } catch (err) {
        console.error("Erro ao buscar colmeias:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHives();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48 text-gray-500">
        Carregando colmeias...
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
            🐝 Colmeias
          </h1>

          <span
            className="inline-block text-xs px-3 py-1 rounded-full"
            style={{
              background: COLORS.HONEY_GOLD,
              color: COLORS.HIVE_BROWN,
              fontWeight: 600,
            }}
          >
            {hives.length} registradas
          </span>
        </div>

        {/* BOTÃO NOVA COLMEIA */}
        <Link
          href="/dashboard/components/hive/new"
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
          Nova colmeia
        </Link>
      </div>

      {/* Estado vazio */}
      {hives.length === 0 ? (
        <div className="bg-white rounded-xl p-10 text-center text-gray-500 shadow-sm">
          Nenhuma colmeia cadastrada.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {hives.map((hive, index) => (
            <div
              key={hive.id ?? `hive-${index}`}
              className="bg-white rounded-2xl p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Nome */}
              <h3
                className="text-lg font-semibold mb-2"
                style={{ color: COLORS.HIVE_BROWN }}
              >
                {hive.nickname}
              </h3>

              {/* Status */}
              <span
                className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4"
                style={{
                  background: hive.status === "ATIVA" ? "#E6F4EA" : "#E5E7EB",
                  color: hive.status === "ATIVA" ? "#1E7A3A" : "#4B5563",
                }}
              >
                {hive.status}
              </span>

              {/* Separador */}
              <div className="h-px bg-gray-200 mb-4" />

              {/* Informações */}
              <div className="text-sm text-gray-700 space-y-2">
                <p>
                  <strong>Espécie:</strong> {hive.beeSpecies}
                </p>
                <p>
                  <strong>População:</strong> {hive.population}
                </p>
                <p>
                  <strong>Produção:</strong> {hive.production} kg
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
