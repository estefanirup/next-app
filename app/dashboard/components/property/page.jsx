"use client";

import { useEffect, useState } from "react";
import { API_POSTGRES } from "../../../const";

const COLORS = {
  BEE_YELLOW: "#F2C849",
  HONEY_GOLD: "#F2C063",
  HIVE_BROWN: "#592D23",
  CLOUD_WHITE: "#F5F9F9",
  SKY_BLUE: "#7EB0F2",
};

export default function PropertyList() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      try {
        const res = await fetch(
          `${API_POSTGRES}/api/properties?page=0&size=10`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        const data = await res.json();
        setProperties(data.content || data);
      } catch (err) {
        console.error("Erro ao buscar propriedades:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48 text-gray-500">
        Carregando propriedades...
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
          Propriedades
        </h1>

        <span
          className="text-sm px-4 py-1 rounded-full"
          style={{
            background: COLORS.HONEY_GOLD,
            color: COLORS.HIVE_BROWN,
            fontWeight: 600,
          }}
        >
          {properties.length} registros
        </span>
      </div>

      {/* Estado vazio */}
      {properties.length === 0 ? (
        <div className="bg-white rounded-xl p-10 text-center text-gray-500 shadow-sm">
          Nenhuma propriedade cadastrada.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((prop, index) => (
            <div
              key={prop.id ?? `property-${index}`}
              className="bg-white rounded-2xl p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Nome */}
              <h3
                className="text-lg font-semibold mb-3"
                style={{ color: COLORS.HIVE_BROWN }}
              >
                {prop.name}
              </h3>

              {/* Endereço */}
              <div className="text-sm text-gray-600 mb-4">
                <span className="mr-1">📍</span>
                {prop.address}, {prop.number}
              </div>

              {/* Separador */}
              <div className="h-px bg-gray-200 mb-4" />

              {/* Descrição */}
              <p className="text-sm text-gray-700 leading-relaxed">
                {prop.description || "Sem descrição disponível."}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
