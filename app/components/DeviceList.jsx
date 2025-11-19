"use client";

import { useEffect, useState } from "react";
import { API_POSTGRES } from "../const";

export default function DeviceList({ token }) {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    const fetchDevices = async () => {
      try {
        const res = await fetch(`${API_POSTGRES}/devices?page=0&size=5`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        if (!res.ok) throw new Error("Falha ao carregar dispositivos");

        const data = await res.json();
        setDevices(data.content || data); // depende da sua API
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchDevices();
  }, [token]);

  if (loading) return <p>Carregando dispositivos...</p>;
  if (!devices.length) return <p>Nenhum dispositivo encontrado.</p>;

  return (
    <ul className="space-y-2">
      {devices.map((d) => (
        <li key={d.id} className="border p-2 rounded flex justify-between">
          <span>{d.model} ({d.status})</span>
          <span>Bateria: {d.batteryStatus}%</span>
        </li>
      ))}
    </ul>
  );
}
