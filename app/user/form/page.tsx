'use client'
import { useState } from 'react'

export default function UserFormPage() {
  const [mensagem, setMensagem] = useState<{ tipo: string; texto: string } | null>(null)

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Cadastro de Usuário</h1>

      {mensagem && (
        <div
          className={`mb-4 p-3 rounded ${
            mensagem.tipo === 'sucesso' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
        >
          {mensagem.texto}
        </div>
      )}

      <form className="space-y-4">
        <div>
          <label htmlFor="firstName" className="block font-medium mb-1">
            Nome
          </label>
          <input id="firstName" type="text" className="w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label htmlFor="lastName" className="block font-medium mb-1">
            Sobrenome
          </label>
          <input id="lastName" type="text" className="w-full border rounded px-3 py-2" required />
        </div>

        <div>
          <label htmlFor="email" className="block font-medium mb-1">
            Email
          </label>
          <input id="email" type="email" className="w-full border rounded px-3 py-2" required />
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
        >
          Cadastrar
        </button>
      </form>

      <a href="/users" className="block mt-6 text-blue-600 underline">
        Voltar à lista
      </a>
    </div>
  )
}
