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

export default function NewHivePage() {
    const router = useRouter();

    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(false);

    const [properties, setProperties] = useState([]);
    const [devices, setDevices] = useState([]);

    const [form, setForm] = useState({
        beeSpecies: "",
        lastHarvest: "",
        installationDate: "",
        status: "HEALTHY",
        nickname: "",
        population: "",
        production: "",
        coordinates: "",
        inspectionNote: "",
        propertyId: "",
        deviceId: "",
    });

    // Pega o token
    useEffect(() => {
        const storedToken = localStorage.getItem("accessToken");
        setToken(storedToken);
    }, []);

    // Busca propriedades e dispositivos
    useEffect(() => {
        if (!token) return;

        const fetchData = async () => {
            try {
                const [propRes, devRes] = await Promise.all([
                    fetch(`${API_POSTGRES}/api/properties?page=0&size=50`, {
                        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
                    }),
                    fetch(`${API_POSTGRES}/devices?page=0&size=50`, {
                        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
                    }),
                ]);

                const propData = await propRes.json();
                const devData = await devRes.json();

                setProperties(propData.content || propData);
                setDevices(devData.content || devData);
            } catch (err) {
                console.error("Erro ao buscar propriedades ou dispositivos:", err);
            }
        };

        fetchData();
    }, [token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!token) return;

        setLoading(true);

        try {
            // Monta payload com conversão correta de tipos e null/undefined
            const payload = {
                beeSpecies: form.beeSpecies,
                nickname: form.nickname,
                status: form.status,
                installationDate: form.installationDate || undefined,
                lastHarvest: form.lastHarvest || undefined,
                coordinates: form.coordinates || undefined,
                propertyId: form.propertyId ? Number(form.propertyId) : undefined,
                deviceId: form.deviceId ? Number(form.deviceId) : undefined,
                population: form.population ? Number(form.population) : undefined,
                production: form.production ? Number(form.production) : undefined,
                inspectionNote: form.inspectionNote ? Number(form.inspectionNote) : undefined,
            };

            // Remove campos undefined para evitar enviar ""
            Object.keys(payload).forEach(
                key => payload[key] === undefined && delete payload[key]
            );

            const res = await fetch(`${API_POSTGRES}/hives`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                console.error("Erro detalhado do backend:", errData);
                throw new Error("Erro ao cadastrar colmeia");
            }

            router.push("/dashboard/components/hive");
        } catch (err) {
            console.error(err);
            alert("Erro ao cadastrar colmeia. Veja o console para detalhes.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="p-8 min-h-screen flex flex-col items-center" style={{ background: COLORS.CLOUD_WHITE }}>
            {/* Cabeçalho */}
            <div className="w-full max-w-2xl mb-8 text-center">
                <h1 className="text-3xl font-bold mb-2" style={{ color: COLORS.HIVE_BROWN }}>
                    Nova Colmeia
                </h1>
                <p className="text-gray-600 text-sm">
                    Cadastre uma nova colmeia associando a uma propriedade e dispositivo
                </p>
            </div>

            {/* Formulário */}
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-2xl bg-white rounded-2xl shadow-md p-8 space-y-6 transition-all hover:shadow-lg"
            >
                {/* Espécie de abelha */}
                <div>
                    <label className="block text-sm font-medium mb-1">Espécie de abelha</label>
                    <input
                        name="beeSpecies"
                        required
                        value={form.beeSpecies}
                        onChange={handleChange}
                        placeholder="Ex: Apis abelhuda"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                    />
                </div>

                {/* Nickname */}
                <div>
                    <label className="block text-sm font-medium mb-1">Apelido</label>
                    <input
                        name="nickname"
                        required
                        value={form.nickname}
                        onChange={handleChange}
                        placeholder="Ex: Colmeia Azul"
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
                        <option value="HEALTHY">HEALTHY</option>
                        <option value="WARNING">WARNING</option>
                        <option value="CRITICAL">CRITICAL</option>
                    </select>
                </div>

                {/* Datas */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Data de Instalação</label>
                        <input
                            type="date"
                            name="installationDate"
                            value={form.installationDate}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Última Colheita</label>
                        <input
                            type="date"
                            name="lastHarvest"
                            value={form.lastHarvest}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                        />
                    </div>
                </div>

                {/* População e Produção */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">População</label>
                        <input
                            type="number"
                            name="population"
                            value={form.population}
                            onChange={handleChange}
                            placeholder="Ex: 12000"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Produção (kg)</label>
                        <input
                            type="number"
                            step="0.1"
                            name="production"
                            value={form.production}
                            onChange={handleChange}
                            placeholder="Ex: 15.7"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                        />
                    </div>
                </div>

                {/* Coordenadas */}
                <div>
                    <label className="block text-sm font-medium mb-1">Coordenadas</label>
                    <input
                        name="coordinates"
                        value={form.coordinates}
                        onChange={handleChange}
                        placeholder="Ex: -25.4284,-49.2733"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                    />
                </div>

                {/* Nota da inspeção */}
                <div>
                    <label className="block text-sm font-medium mb-1">Nota da Inspeção</label>
                    <input
                        type="number"
                        name="inspectionNote"
                        value={form.inspectionNote}
                        onChange={handleChange}
                        min={0}
                        max={10}
                        placeholder="Ex: 9"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                    />
                </div>

                {/* Propriedade e Dispositivo */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Propriedade</label>
                        <select
                            name="propertyId"
                            value={form.propertyId || ""}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                        >
                            <option value="">Selecione uma propriedade</option>
                            {properties.map((p, index) => (
                                <option key={p.id ?? `property-${index}`} value={p.id}>
                                    {p.name} - {p.address}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Dispositivo</label>
                        <select
                            name="deviceId"
                            value={form.deviceId || ""}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                        >
                            <option value="">Selecione um dispositivo</option>
                            {devices.map((d, index) => (
                                <option key={d.id ?? `device-${index}`} value={d.id}>
                                    {d.model} ({d.status})
                                </option>
                            ))}
                        </select>
                    </div>
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
                        onClick={() => router.push("/dashboard/components/hive")}
                        className="px-6 py-2 rounded-xl border border-gray-300 font-semibold text-gray-700 transition transform hover:-translate-y-0.5 hover:shadow-sm"
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </section>
    );
}
