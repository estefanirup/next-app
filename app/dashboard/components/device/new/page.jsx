"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API_POSTGRES } from "../../../../const";

const COLORS = {
  BEE_YELLOW: "#F2C849",
  HONEY_GOLD: "#F2C063",
  HIVE_BROWN: "#592D23",
  CLOUD_WHITE: "#F5F9F9",
};

export default function NewDevicePage() {
  const router = useRouter();

  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    model: "",
    version: "",
    batteryStatus: 100,
    powerSource: "",
    status: "ONLINE",
  });

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    setToken(storedToken);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return;

    setLoading(true);

    try {
      const res = await fetch(`${API_POSTGRES}/devices`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...form,
          batteryStatus: Number(form.batteryStatus),
        }),
      });

      if (!res.ok) {
        throw new Error("Erro ao cadastrar dispositivo");
      }

      router.push("/dashboard/devices");
    } catch (err) {
      console.error(err);
      alert("Erro ao cadastrar dispositivo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="p-8 min-h-screen flex flex-col items-center"
      style={{ background: COLORS.CLOUD_WHITE }}
    >
      {/* Cabeçalho */}
      <div className="w-full max-w-2xl mb-8 text-center">
        <h1
          className="text-3xl font-bold mb-2"
          style={{ color: COLORS.HIVE_BROWN }}
        >
          Novo Dispositivo
        </h1>
        <p className="text-gray-600 text-sm">
          Cadastre um novo dispositivo IoT para monitoramento
        </p>
      </div>

      {/* Formulário */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-md p-8 space-y-6 transition-all hover:shadow-lg"
      >
        {/* Modelo */}
        <div>
          <label className="block text-sm font-medium mb-1">Modelo</label>
          <input
            name="model"
            required
            value={form.model}
            onChange={handleChange}
            placeholder="Ex: Device Pro Max"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
          />
        </div>

        {/* Versão */}
        <div>
          <label className="block text-sm font-medium mb-1">Versão</label>
          <input
            name="version"
            value={form.version}
            onChange={handleChange}
            placeholder="Ex: 1.0"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
          >
            <option value="ONLINE">ONLINE</option>
            <option value="OFFLINE">OFFLINE</option>
          </select>
        </div>

        {/* Fonte de energia */}
        <div>
          <label className="block text-sm font-medium mb-1">Fonte de Energia</label>
          <input
            name="powerSource"
            value={form.powerSource}
            onChange={handleChange}
            placeholder="Ex: Solar"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
          />
        </div>

        {/* Bateria */}
        <div>
          <label className="block text-sm font-medium mb-1">Bateria (%)</label>
          <input
            type="number"
            min={0}
            max={100}
            name="batteryStatus"
            value={form.batteryStatus}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
          />
        </div>

        {/* Ações */}
        <div className="flex gap-4 justify-end pt-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 rounded-xl font-semibold text-white transition transform hover:-translate-y-0.5 hover:shadow-md"
            style={{ background: COLORS.HONEY_GOLD }}
          >
            {loading ? "Salvando..." : "Salvar"}
          </button>

          <button
            type="button"
            onClick={() => router.push("/dashboard/components/devices")}
            className="px-6 py-2 rounded-xl border border-gray-300 font-semibold text-gray-700 transition transform hover:-translate-y-0.5 hover:shadow-sm"
          >
            Cancelar
          </button>
        </div>
      </form>
    </section>
  );
}
