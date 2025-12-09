"use client";

import { useEffect, useState } from "react";
import { API_POSTGRES } from "../../../const";

export default function SensorList() {
    const [sensors, setSensors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSensors = async () => {
            const token = localStorage.getItem("accessToken");
            if (!token) return;


            try {
                const res = await fetch(`${API_POSTGRES}/sensors?page=0&size=10`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                });
                const data = await res.json();
                setSensors(data.content || data);
            } catch (err) {
                console.error("Erro ao buscar sensores:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchSensors();


    }, []);

    if (loading) return <p>Carregando sensores...</p>;

    return (<div className="p-4 border rounded-md mb-4"> <h2 className="font-bold text-lg mb-2">Sensores</h2>
        {sensors.length === 0 ? (<p>Nenhum sensor encontrado.</p>
        ) : (<ul className="list-disc pl-5">
            {sensors.map((sensor) => (<li key={sensor.id}>
                {sensor.type} ({sensor.measurementUnit}) - Valor: {sensor.lastValue} - Status:{" "}
                {sensor.status} </li>
            ))} </ul>
        )} </div>
    );
}
