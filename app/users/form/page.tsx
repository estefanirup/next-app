'use client';

import Link from "next/link";

export default function UserForm() {
  return (
    <main>
      <div className="max-w-md mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Cadastro de Usuário</h1>

        <form className="space-y-4">
          <div>
            <label htmlFor="firstName" className="block font-medium mb-1">
              Nome
            </label>
            <input
              id="firstName"
              type="text"
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block font-medium mb-1">
              Sobrenome
            </label>
            <input
              id="lastName"
              type="text"
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
          >
            Cadastrar
          </button>
        </form>

        <Link href="/users" className="block mt-6 text-blue-600 underline">
          Voltar à lista
        </Link>
      </div>
    </main>
  );
}
