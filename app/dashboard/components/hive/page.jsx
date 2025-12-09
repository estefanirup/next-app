"use client";

import { useEffect, useState } from "react";
import { API_POSTGRES } from "../../../const";

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

    if (loading) return <p>Carregando colmeias...</p>;

    return (<div className="p-4 border rounded-md mb-4"> <h2 className="font-bold text-lg mb-2">Colmeias</h2>
        {hives.length === 0 ? (<p>Nenhuma colmeia encontrada.</p>
        ) : (<ul className="list-disc pl-5">
            {hives.map((hive) => (<li key={hive.id}>
                {hive.nickname} ({hive.beeSpecies}) - Status: {hive.status} - População:{" "}
                {hive.population} - Produção: {hive.production} kg </li>
            ))} </ul>
        )} </div>
    );
}
