'use client';

import { useEffect, useState } from "react";

interface Colmeia {
    id: string;
    identificador: string;
    localizacao: string;
    peso: number;
    temperaturaInterna: number;
    umidadeInterna: number;
}

export default function ColmeiaList() {

    const [colmeias, setColmeias] = useState<Colmeia[]>([]);

    const loadColmeias = async () => {
        try {
            const response = await fetch('/api/colmeias', {
                method: 'GET',
                headers: {
                    'x-api-key': 'reqres-free-v1'
                }
            });

            const res = await response.json();
            console.log(res);

            // Se a API retorna { data: [...] }
            if (res.data) {
                setColmeias(res.data);
            } else {
                setColmeias(res);
            }

        } catch (err) {
            console.log("Erro ao carregar colmeias:", err);
        }
    }

    useEffect(() => {
        loadColmeias();
    }, []);

    return (
        <main>
            <div className="max-w-4xl mx-auto p-6">

                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Colmeias (API Externa)</h1>

                    <div className="flex gap-3">
                        <button
                            type='button'
                            onClick={loadColmeias}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
                        >
                            Atualizar
                        </button>

                        <a
                            href="/colmeias/nova"
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
                        >
                            Nova Colmeia
                        </a>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-3 px-4 border-b text-left">Identificador</th>
                                <th className="py-3 px-4 border-b text-left">Localização</th>
                                <th className="py-3 px-4 border-b text-left">Peso</th>
                                <th className="py-3 px-4 border-b text-left">Temp. Interna</th>
                                <th className="py-3 px-4 border-b text-left">Umidade</th>
                            </tr>
                        </thead>

                        <tbody>
                            {colmeias.map((c) => (
                                <tr key={c.id} className="hover:bg-gray-50">
                                    <td className="py-3 px-4 border-b">{c.identificador}</td>
                                    <td className="py-3 px-4 border-b">{c.localizacao}</td>
                                    <td className="py-3 px-4 border-b">{c.peso} kg</td>
                                    <td className="py-3 px-4 border-b">{c.temperaturaInterna} °C</td>
                                    <td className="py-3 px-4 border-b">{c.umidadeInterna} %</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <a href="/" className="block mt-6 text-blue-600 underline">
                    Voltar ao Home
                </a>
            </div>
        </main>
    );
}
