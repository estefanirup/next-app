
import Link from "next/link";

export default function UsersPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Usuários (API externa)</h1>
        <div className="flex gap-3">
          <button
            type='button'
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
          >
            Atualizar
          </button>

          <a
            href="/users/form"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow flex items-center"
          >
            Novo
          </a>
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
            <tr className="hover:bg-gray-50">
              <td className="py-3 px-4 border-b">
                <img className="w-10 h-10 rounded-full" />
              </td>
              <td className="py-3 px-4 border-b"></td>
              <td className="py-3 px-4 border-b"></td>
            </tr>
          </tbody>
        </table>
      </div>

      <a href="/" className="block mt-6 text-blue-600 underline">
        Voltar ao Home
      </a>
    </div>
  );
}
