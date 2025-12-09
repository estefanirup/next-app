"use client";

import { useEffect, useState } from "react";
import { API_POSTGRES } from "../../../const";

export default function PropertyList() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProperties = async () => {
            const token = localStorage.getItem("accessToken");
            if (!token) return;


            try {
                const res = await fetch(`${API_POSTGRES}/api/properties?page=0&size=10`, {
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

    if (loading) return <p>Carregando propriedades...</p>;

    return (<div className="p-4 border rounded-md mb-4"> <h2 className="font-bold text-lg mb-2">Propriedades</h2>
        {properties.length === 0 ? (<p>Nenhuma propriedade encontrada.</p>
        ) : (<ul className="list-disc pl-5">
            {properties.map((prop) => (<li key={prop.id}>
                {prop.name} - {prop.address}, {prop.number} - {prop.description} </li>
            ))} </ul>
        )} </div>
    );
}
