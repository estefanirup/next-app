"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API_POSTGRES } from "../../../../const";

const COLORS = {
    SENSOR_BLUE: "#4A90E2",
    ACTIVE_GREEN: "#3CB371",
    INACTIVE_GRAY: "#B0B0B0",
    CLOUD_WHITE: "#F5F9F9",
};

export default function NewSensorPage() {
    const router = useRouter();

    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(false);

    const [devices, setDevices] = useState([]);

    const [form, setForm] = useState({
        type: "",
        measurementUnit: "",
        lastValue: "",
        status: "ACTIVE",
        minLimit: "",
        maxLimit: "",
        installationDate: "",
        deviceId: "",
    });

    // Pega o token
    useEffect(() => {
        const storedToken = localStorage.getItem("accessToken");
        setToken(storedToken);
    }, []);

    // Busca dispositivos
    useEffect(() => {
        if (!token) return;

        const fetchDevices = async () => {
            try {
                const res = await fetch(`${API_POSTGRES}/devices?page=0&size=50`, {
                    headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
                });
                const data = await res.json();
                setDevices(data.content || data);
            } catch (err) {
                console.error("Erro ao buscar dispositivos:", err);
            }
        };

        fetchDevices();
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
            const payload = {
                type: form.type,
                measurementUnit: form.measurementUnit,
                lastValue: form.lastValue ? Number(form.lastValue) : undefined,
                status: form.status,
                minLimit: form.minLimit ? Number(form.minLimit) : undefined,
                maxLimit: form.maxLimit ? Number(form.maxLimit) : undefined,
                installationDate: form.installationDate || undefined,
                deviceId: form.deviceId ? Number(form.deviceId) : undefined,
            };

            // Remove campos undefined
            Object.keys(payload).forEach(
                key => payload[key] === undefined && delete payload[key]
            );

            const res = await fetch(`${API_POSTGRES}/sensors`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                let errData = {};
                try {
                    errData = await res.json();
                } catch {
                    console.warn("Backend retornou resposta não-JSON:", await res.text());
                }
                console.error("Erro detalhado do backend:", errData, "Status:", res.status, res.statusText);
                throw new Error("Erro ao cadastrar sensor");
            }

            router.push("/dashboard/components/sensor");
        } catch (err) {
            console.error(err);
            alert("Erro ao cadastrar sensor. Veja o console para detalhes.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <section className="p-8 min-h-screen flex flex-col items-center" style={{ background: COLORS.CLOUD_WHITE }}>
            <div className="w-full max-w-2xl mb-8 text-center">
                <h1 className="text-3xl font-bold mb-2" style={{ color: COLORS.SENSOR_BLUE }}>
                    Novo Sensor
                </h1>
                <p className="text-gray-600 text-sm">
                    Cadastre um novo sensor associando-o a um dispositivo
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="w-full max-w-2xl bg-white rounded-2xl shadow-md p-8 space-y-6 transition-all hover:shadow-lg"
            >
                {/* Tipo */}
                <div>
                    <label className="block text-sm font-medium mb-1">Tipo</label>
                    <input
                        name="type"
                        required
                        value={form.type}
                        onChange={handleChange}
                        placeholder="Ex: TEMPERATURA"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    />
                </div>

                {/* Unidade de medida */}
                <div>
                    <label className="block text-sm font-medium mb-1">Unidade de Medida</label>
                    <input
                        name="measurementUnit"
                        required
                        value={form.measurementUnit}
                        onChange={handleChange}
                        placeholder="Ex: °C"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    />
                </div>

                {/* Último valor */}
                <div>
                    <label className="block text-sm font-medium mb-1">Último Valor</label>
                    <input
                        type="number"
                        step="0.1"
                        name="lastValue"
                        value={form.lastValue}
                        onChange={handleChange}
                        placeholder="Ex: 5.0"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    />
                </div>

                {/* Status */}
                <div>
                    <label className="block text-sm font-medium mb-1">Status</label>
                    <select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    >
                        <option value="ACTIVE">ACTIVE</option>
                        <option value="INACTIVE">INACTIVE</option>
                    </select>
                </div>

                {/* Limites */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Limite Mínimo</label>
                        <input
                            type="number"
                            step="0.1"
                            name="minLimit"
                            value={form.minLimit}
                            onChange={handleChange}
                            placeholder="Ex: 15.0"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Limite Máximo</label>
                        <input
                            type="number"
                            step="0.1"
                            name="maxLimit"
                            value={form.maxLimit}
                            onChange={handleChange}
                            placeholder="Ex: 40.0"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        />
                    </div>
                </div>

                {/* Data de instalação */}
                <div>
                    <label className="block text-sm font-medium mb-1">Data de Instalação</label>
                    <input
                        type="date"
                        name="installationDate"
                        value={form.installationDate}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    />
                </div>

                {/* Dispositivo */}
                <div>
                    <label className="block text-sm font-medium mb-1">Dispositivo</label>
                    <select
                        name="deviceId"
                        value={form.deviceId || ""}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    >
                        <option value="">Selecione um dispositivo</option>
                        {devices.map((d, index) => (
                            <option key={d.id ?? `device-${index}`} value={d.id}>
                                {d.model} ({d.status})
                            </option>
                        ))}
                    </select>
                </div>

                {/* Ações */}
                <div className="flex gap-4 justify-end pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2 rounded-xl font-semibold text-white transition transform hover:-translate-y-0.5 hover:shadow-md"
                        style={{ background: COLORS.ACTIVE_GREEN }}
                    >
                        {loading ? "Salvando..." : "Salvar"}
                    </button>

                    <button
                        type="button"
                        onClick={() => router.push("/dashboard/components/sensor")}
                        className="px-6 py-2 rounded-xl border border-gray-300 font-semibold text-gray-700 transition transform hover:-translate-y-0.5 hover:shadow-sm"
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </section>
    );
}
