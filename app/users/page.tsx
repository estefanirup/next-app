'use client';
import Link from "next/link";
import { useEffect, useState } from "react";

export default function UserList() {
  const [users, setUsers] = useState<any[]>([]);

  const loadUsers = async () => {
    try {
      const response = await fetch('https://reqres.in/api/users');
      const data = await response.json();
      setUsers(data.data);
    } catch (err) {
      console.error("Erro ao carregar usuários:", err);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <main>
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Usuários (API externa)</h1>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={loadUsers}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
            >
              Atualizar
            </button>

            <Link
              href="/users/form"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow flex items-center"
            >
              Novo
            </Link>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 border-b text-left">Avatar</th>
                <th className="py-3 px-4 border-b text-left">Nome</th>
                <th className="py-3 px-4 border-b text-left">E-mail</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b">
                    <img src={user.avatar} className="w-10 h-10 rounded-full" />
                  </td>
                  <td className="py-3 px-4 border-b">
                    {user.first_name} {user.last_name}
                  </td>
                  <td className="py-3 px-4 border-b">{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Link href="/" className="block mt-6 text-blue-600 underline">
          Voltar ao Home
        </Link>
      </div>
    </main>
  );
}
