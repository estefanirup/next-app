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

export default function NewPropertyPage() {
  const router = useRouter();

  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    address: "",
    number: "",
    description: "",
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
      const res = await fetch(`${API_POSTGRES}/api/properties`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Erro ao cadastrar propriedade");
      }

      router.push("/dashboard/components/property");
    } catch (err) {
      console.error(err);
      alert("Erro ao cadastrar propriedade");
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
          Nova Propriedade
        </h1>
        <p className="text-gray-600 text-sm">
          Cadastre uma nova propriedade rural
        </p>
      </div>

      {/* Formulário */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-md p-8 space-y-6 transition-all hover:shadow-lg"
      >
        {/* Nome */}
        <div>
          <label className="block text-sm font-medium mb-1">Nome</label>
          <input
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Ex: Apiário Central"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
          />
        </div>

        {/* Endereço */}
        <div>
          <label className="block text-sm font-medium mb-1">Endereço</label>
          <input
            name="address"
            required
            value={form.address}
            onChange={handleChange}
            placeholder="Ex: Avenida das Flores"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
          />
        </div>

        {/* Número */}
        <div>
          <label className="block text-sm font-medium mb-1">Número</label>
          <input
            name="number"
            required
            value={form.number}
            onChange={handleChange}
            placeholder="Ex: 123"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
          />
        </div>

        {/* Descrição */}
        <div>
          <label className="block text-sm font-medium mb-1">Descrição</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Ex: Propriedade principal com 10 colmeias ativas"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition resize-none"
            rows={4}
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
            onClick={() => router.push("/dashboard/components/property")}
            className="px-6 py-2 rounded-xl border border-gray-300 font-semibold text-gray-700 transition transform hover:-translate-y-0.5 hover:shadow-sm"
          >
            Cancelar
          </button>
        </div>
      </form>
    </section>
  );
}
