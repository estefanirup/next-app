'use client'

import { FormEvent, useState } from "react"

export default function UserForm() {

  //Estados
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState<{ tipo: 'sucesso' | 'erro'; texto: string } | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const res = await fetch('https://reqres.in/api/users', {
      method: 'POST',
      headers: {
        'x-api-key': 'reqres-free-v1',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email
      })
    })

    const data = await res.json();
    console.log(data);

    setMensagem({ tipo: 'sucesso', texto: 'Usuário cadastrado com sucesso com o ID ' + data.id });

    setLastName('');
    setFirstName('')
    setEmail('')
  }

  return (
    <main>
      <div className="max-w-md mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Cadastro de Usuário</h1>

        {mensagem && (
          <div
            className={`mb-4 p-3 rounded ${mensagem.tipo === 'sucesso' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}
          >
            {mensagem.texto}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="firstName" className="block font-medium mb-1">
              Nome
            </label>
            <input
              id="firstName"
              type="text"
              className="w-full border rounded px-3 py-2"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
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
              onChange={e => setLastName(e.target.value)}
              value={lastName}
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
              onChange={e => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
          >
            Cadastrar
          </button>
        </form>

        <a href="/user" className="block mt-6 text-blue-600 underline">
          Voltar à lista
        </a>
      </div>
    </main>
  )
}