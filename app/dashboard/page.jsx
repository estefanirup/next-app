"use client";

import { useEffect, useState } from "react";
import { API_POSTGRES } from "../const";
import HiveList from "../components/HiveList";
import PropertyList from "../components/PropertyList";
import DeviceList from "../components/DeviceList";
import SensorList from "../components/SensorList";

export default function DashboardPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) return;


      try {
        const res = await fetch(`${API_POSTGRES}/properties?page=0&size=10`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });
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

  if (loading) return <p>Carregando dashboard...</p>;

  return (<main className="p-6"> <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((prop) => (
        <div key={prop.id} className="p-4 border rounded-lg shadow hover:shadow-lg transition">
          <h2 className="font-semibold text-lg mb-2">{prop.name}</h2>
          <p className="mb-2">{prop.address}, {prop.number}</p>
          <p className="mb-4 text-gray-600">{prop.description}</p>

          <div className="flex flex-col gap-2">
            <button
              className="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700"
              onClick={() => window.location.href = `/property/${prop.id}`}
            >
              Ver Colmeias
            </button>
            <button
              className="bg-green-600 text-white py-1 px-3 rounded hover:bg-green-700"
              onClick={() => window.location.href = `/property/edit/${prop.id}`}
            >
              Editar Propriedade
            </button>
            <button
              className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600"
              onClick={() => window.location.href = `/property/new`}
            >
              Registrar Nova Propriedade
            </button>
          </div>
        </div>
      ))}
    </div>
  </main>


  );
}
